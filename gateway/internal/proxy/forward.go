package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
)

// ProxyOptions — proxy behavior configure করার জন্য
type ProxyOptions struct {
	TargetBase string // backend service base URL (e.g. http://auth-service:8081)
	TargetPath string // backend specific path (e.g. /register)
	// PreserveOriginalPath true হলে gateway path-ই forward হবে (TargetPath ignore)
	PreserveOriginalPath bool
	// InjectUserType — register-এর সময় gateway এই user_type backend-এ inject করে
	InjectUserType string
}

// Forward — incoming request কে backend service এ proxy করে।
// User context (user_id, user_type) header হিসেবে inject করে।
//
// Gateway pattern:
//   1. Mobile App → Gateway: POST /api/v1/user/login {phone, password}
//   2. Gateway → auth-service: POST /login {phone, password}
//      Headers: X-User-Type: citizen (যদি register endpoint হয়)
//   3. auth-service response → Mobile App
func Forward(opts ProxyOptions) gin.HandlerFunc {
	target, err := url.Parse(opts.TargetBase)
	if err != nil {
		panic("Invalid target URL: " + opts.TargetBase + " err: " + err.Error())
	}

	return func(c *gin.Context) {
		proxy := httputil.NewSingleHostReverseProxy(target)

		// Director — outgoing request modify করার জন্য
		originalDirector := proxy.Director
		proxy.Director = func(req *http.Request) {
			originalDirector(req)

			// Path rewrite — gateway path থেকে backend path
			if !opts.PreserveOriginalPath && opts.TargetPath != "" {
				// Wildcard path support: /posts/*path → /posts/{path}
				// Gin route parameter থেকে path build
				rewritten := opts.TargetPath
				if strings.Contains(opts.TargetPath, "{path}") {
					p := c.Param("path")
					rewritten = strings.Replace(opts.TargetPath, "{path}", p, 1)
				}
				req.URL.Path = rewritten
				req.URL.RawPath = ""
			}

			// Authenticated request হলে user info header হিসেবে forward
			if userID, exists := c.Get("user_id"); exists {
				if v, ok := userID.(string); ok {
					req.Header.Set("X-User-Id", v)
				}
			}
			if userType, exists := c.Get("user_type"); exists {
				if v, ok := userType.(string); ok {
					req.Header.Set("X-User-Type", v)
				}
			}

			// Public endpoint (e.g. register) — gateway user_type inject করে
			if opts.InjectUserType != "" {
				req.Header.Set("X-Gateway-Inject-User-Type", opts.InjectUserType)
			}

			// Gateway identifier — backend জানবে request gateway থেকে এসেছে
			req.Header.Set("X-Forwarded-By", "nagoman-api-gateway")
			req.Host = target.Host
		}

		// Error handler — backend service down হলে graceful fail
		proxy.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
			rw.Header().Set("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadGateway)
			rw.Write([]byte(`{"success":false,"message":"Backend service unavailable","data":null}`))
		}

		proxy.ServeHTTP(c.Writer, c.Request)
	}
}

// WebSocket — realtime-service (Rust) এ WebSocket upgrade proxy।
// HTTP/WS protocol upgrade handle করে।
func WebSocket(targetBase string, targetPath string) gin.HandlerFunc {
	target, err := url.Parse(targetBase)
	if err != nil {
		panic("Invalid WebSocket target URL: " + targetBase)
	}

	return func(c *gin.Context) {
		proxy := httputil.NewSingleHostReverseProxy(target)

		originalDirector := proxy.Director
		proxy.Director = func(req *http.Request) {
			originalDirector(req)

			// Path rewrite for WebSocket
			if targetPath != "" {
				req.URL.Path = targetPath
				req.URL.RawPath = ""
			}

			// JWT token info header হিসেবে realtime service-এ forward
			if userID, exists := c.Get("user_id"); exists {
				if v, ok := userID.(string); ok {
					req.Header.Set("X-User-Id", v)
				}
			}
			if userType, exists := c.Get("user_type"); exists {
				if v, ok := userType.(string); ok {
					req.Header.Set("X-User-Type", v)
				}
			}

			req.Host = target.Host
		}

		proxy.ServeHTTP(c.Writer, c.Request)
	}
}


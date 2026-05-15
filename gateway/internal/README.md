# NagoMan API Gateway

Mobile app এর জন্য single entry point. সব মোবাইল request এই gateway তে আসবে, এবং gateway সঠিক backend microservice এ forward করবে।

## Architecture

```
┌──────────────────┐
│   Mobile Apps    │
│ ┌────┬─────┬───┐ │
│ │User│Member│Cand│ │
│ └────┴─────┴───┘ │
└────────┬─────────┘
         │  HTTPS
         ▼
┌──────────────────┐
│   API Gateway    │  ← এই service (port 8080)
│  - JWT Validate  │
│  - Role Check    │
│  - Path Route    │
│  - Forward       │
└────────┬─────────┘
         │
   ┌─────┴──────┬──────────┬──────────┬──────────┐
   ▼            ▼          ▼          ▼          ▼
┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
│ Auth │   │Social│   │ Org  │   │Report│   │RealT │
│ :8081│   │:8082 │   │:8083 │   │:8084 │   │:8088 │
└──────┘   └──────┘   └──────┘   └──────┘   └──────┘
```

## URL Pattern (3 Mobile Apps)

| Prefix | Mobile App | User Type |
|---|---|---|
| `/api/v1/user/*` | নাগরিক (Citizen) | `citizen` |
| `/api/v1/member/*` | সেবক (Member) | `member` |
| `/api/v1/candidate/*` | জনসেবক (Representative) | `representative` |
| `/api/v1/knowledge/*` | সবাই share করে | any authenticated |
| `/api/v1/chat/*` | সবাই share করে | any authenticated |
| `/api/v1/notifications/*` | সবাই share করে | any authenticated |

## Authentication Flow

```
1. Mobile App: POST /api/v1/user/login {phone, password}
2. Gateway → auth-service: POST /api/v1/auth/login
3. auth-service: validate, issue JWT
4. JWT contains: {sub: user_id, type: user_type, exp: ...}
5. Mobile App stores JWT
6. Future request: GET /api/v1/user/feed
   Headers: Authorization: Bearer <jwt>
7. Gateway: JWT validate + role check (citizen)
8. Gateway → social-service with X-User-Id, X-User-Type headers
9. social-service trusts headers (no re-validate)
```

## JWT Token Format

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "type": "citizen",
  "exp": 1717804800,
  "iat": 1717200000
}
```

- **Algorithm:** HS256
- **Secret:** `JWT_SECRET` env var (auth-service এর সাথে same)
- **Expiry:** 7 days

## Running Locally

### With Docker (recommended)

```bash
cd D:\NagoMan
docker-compose up --build
```

API Gateway available at: `http://localhost:8080`

### Standalone (development)

```bash
cd D:\NagoMan\services\api-gateway
cp .env.example .env
# .env এ value gula edit করো, especially backend service URLs
go mod download
go run main.go
```

## Testing

### Health check
```bash
curl http://localhost:8080/health
```

### Citizen registration
```bash
curl -X POST http://localhost:8080/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "rakib123",
    "first_name": "Rakib",
    "phone": "01712345678",
    "password": "secret123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "01712345678",
    "password": "secret123"
  }'
# Response: {"token": "eyJhbGc...", "user": {...}}
```

### Authenticated request
```bash
curl http://localhost:8080/api/v1/user/feed \
  -H "Authorization: Bearer eyJhbGc..."
```

## Headers Forwarded to Backend Services

| Header | Description | When set |
|---|---|---|
| `X-User-Id` | User UUID from JWT | Authenticated endpoints |
| `X-User-Type` | citizen/member/representative | Authenticated endpoints |
| `X-Gateway-Inject-User-Type` | Forced user_type for register | Register endpoints |
| `X-Forwarded-By` | Always `nagoman-api-gateway` | All requests |

Backend service এ এই header trust করে — JWT re-validate করতে হবে না।

## Adding New Routes

Step 1: backend service create endpoint, e.g. `org-service: POST /api/v1/donations`

Step 2: `main.go` এর appropriate function এ add করো:

```go
// registerMemberRoutes function এ
auth.POST("/donations", proxy.Forward(proxy.ProxyOptions{
    TargetBase: s.Org,
    TargetPath: "/api/v1/donations",
}))
```

Step 3: Restart gateway:
```bash
docker-compose restart api-gateway
```

## Production Deployment

### Environment Variables (must change)

```bash
# Strong random JWT secret (min 32 chars)
JWT_SECRET=$(openssl rand -hex 32)

# Production service URLs (Kubernetes DNS or actual IPs)
AUTH_SERVICE_URL=https://auth.internal.nagoman.com
SOCIAL_SERVICE_URL=https://social.internal.nagoman.com
# ... etc
```

### CORS — production-এ specific origin

`middleware/cors.go` এ `AllowOrigins: []string{"*"}` change করে actual mobile app + admin panel domain দাও।

### Rate Limiting (Phase 2)

এখন rate limiting নাই। Production এ Redis-based rate limiter add করতে হবে। Suggested package: `github.com/ulule/limiter/v3`.

### Observability (Phase 2)

- Sentry — error tracking
- Prometheus — metrics
- Loki — log aggregation
- Tempo — distributed tracing

## File Structure

```
api-gateway/
├── main.go                  # Entry point + route definitions
├── go.mod                   # Dependencies
├── Dockerfile               # Container build
├── .env.example             # Environment template
├── README.md                # This file
├── config/
│   └── services.go          # Service URL config
├── middleware/
│   ├── jwt.go               # JWT validation
│   ├── role.go              # Role-based access
│   ├── cors.go              # CORS handling
│   └── logger.go            # Request logging
├── proxy/
│   └── forward.go           # Reverse proxy + WebSocket
└── handlers/
    └── health.go            # Health check + index
```

## Backend Service Contract

প্রতিটি backend service কে এই rules follow করতে হবে:

1. **Trust gateway headers** — `X-User-Id`, `X-User-Type` re-validate করতে হবে না
2. **JSON response format:**
   ```json
   {
     "success": true|false,
     "message": "string",
     "data": {...} | null
   }
   ```
3. **Standard ports:**
   - auth-service: 8081
   - social-service: 8082
   - org-service: 8083
   - reports-service: 8084
   - election-service: 8085
   - knowledge-service: 8086
   - notification-service: 8087
   - realtime-service: 8088
4. **Health endpoint:** `GET /health` return 200 OK

## TODO (Future Improvements)

- [ ] Rate limiting per user (Redis backed)
- [ ] Request ID propagation (X-Request-Id)
- [ ] Circuit breaker (backend service down হলে graceful)
- [ ] Response caching for read-heavy endpoints
- [ ] OpenAPI/Swagger documentation auto-generate
- [ ] gRPC support for inter-service communication
- [ ] Centralized logging (Loki/BetterStack)
- [ ] Metrics export (Prometheus)

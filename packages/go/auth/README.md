# NagoMan Shared Auth Middleware (Go)

Reference implementation for **gateway-trust middleware** এবং **JWT validation**।

প্রতিটি Go service এ inline copy করতে হবে — Go workspace complexity এড়ানোর জন্য। এই folder reference হিসেবে কাজ করে।

## Files

- `middleware.go` — gateway header trust + JWT validation middleware
- `jwt.go` — JWT parse + verify utility

## Usage Pattern

প্রতিটি Go service (auth/social/org/reports/election/knowledge/notification):

1. `middleware/gateway.go` ফাইল create
2. এই folder থেকে কোড copy
3. service এর main.go এ apply

## Why inline copy, not shared module?

- Solo dev এ Go workspace + replace directive overhead বেশি
- Each service deploy হবে আলাদা Docker container — shared lib version sync জটিল
- Microservice principle: each service self-contained

পরে team বড় হলে — `go.work` workspace setup করা যাবে।

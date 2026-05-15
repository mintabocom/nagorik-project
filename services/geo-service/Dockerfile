# build stage
FROM golang:1.23-alpine AS build

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go mod tidy
RUN go build -o main ./cmd/server

# run stage
FROM alpine:3.18

WORKDIR /app

COPY --from=build /app/main .

EXPOSE 8088

CMD ["./main"]

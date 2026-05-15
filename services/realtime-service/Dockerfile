# build stage
FROM rust:slim AS build

WORKDIR /app

# Dependency caching এর জন্য (Optional but good)
COPY Cargo.toml ./
# Create dummy main.rs to build dependencies
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Copy real source
COPY src ./src
RUN cargo build --release

# run stage
FROM debian:bookworm-slim

WORKDIR /app

# SSL সার্টিফিকেটের জন্য (যদি প্রয়োজন হয়)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/release/nagoman-realtime-service ./realtime-service

EXPOSE 8081

CMD ["./realtime-service"]

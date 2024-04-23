FROM golang:alpine AS builder
WORKDIR /app
COPY ./main.go ./
RUN go build -o /app main.go

FROM scratch
WORKDIR /app
COPY --from=builder ./app ./
ENTRYPOINT ["./main"]
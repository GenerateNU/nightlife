FROM golang:1.21-alpine as builder

WORKDIR /app
RUN apk add --no-cache git

COPY . ./
RUN go -o bin/nightlife cmd/server/main.go

FROM scratch
COPY --from=builder /app/bin/nightlife /nightlife
ENV APP_ENVIRONMENT production

ENTRYPOINT [ "./nightlife" ]
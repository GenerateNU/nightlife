FROM golang:1.21-alpine as builder

WORKDIR /app
<<<<<<< HEAD
RUN apk add --no-cache git

COPY . ./
RUN go build -o bin/nightlife cmd/server/main.go
=======
RUN apk add --no-cache make git

COPY . ./
RUN make backend-build
>>>>>>> 915b64e (refactor! (#20))

FROM scratch
COPY --from=builder /app/bin/nightlife /nightlife
ENV APP_ENVIRONMENT production

ENTRYPOINT [ "./nightlife" ]
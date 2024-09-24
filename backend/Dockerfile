FROM golang:1.21-alpine as builder

WORKDIR /app
RUN apk add --no-cache make git

COPY . ./
RUN make backend-build

FROM scratch
COPY --from=builder /app/bin/nightlife /nightlife
ENV APP_ENVIRONMENT production

ENTRYPOINT [ "./nightlife" ]
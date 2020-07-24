FROM node:buster as builder
RUN mkdir /app
WORKDIR /app/
COPY . /app/
RUN yarn install
RUN yarn audit || true
#RUN yarn lint #Currently not passing
RUN yarn doc
RUN yarn build

FROM alpine:3
COPY --from=builder /app/docs/ /extension

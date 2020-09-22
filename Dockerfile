FROM node:buster as builder
RUN mkdir /app
WORKDIR /app/
COPY . /app/
RUN apt-get update; apt-get install zip -y
RUN yarn install
RUN yarn audit || true
#RUN yarn lint #Currently not passing
RUN yarn doc
RUN yarn build
RUN zip -r extension-for-google.zip extensions
RUN cp public/README.txt README.txt
RUN zip -r extension.zip extensions README.txt

FROM alpine:3
COPY --from=builder /app/*.zip /app/

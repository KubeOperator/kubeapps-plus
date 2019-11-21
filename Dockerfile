FROM node:latest AS build
WORKDIR /app

RUN apt-get update
COPY . /app
RUN cd /app && yarn install && yarn build

FROM bitnami/nginx:1.16.1-debian-9-r52
COPY --from=build /app/dist /app


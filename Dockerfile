FROM node:8.9 AS build
WORKDIR /app

RUN yarn install 

COPY . /app
RUN yarn run build

FROM bitnami/nginx:1.16.1-debian-9-r52
COPY --from=build /app/build /app


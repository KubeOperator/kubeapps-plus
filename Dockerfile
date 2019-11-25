FROM node:latest as node-static

WORKDIR /app

RUN apt-get update

COPY . /app

RUN cd /app && yarn install && yarn build



FROM nginx

MAINTAINER support support@fit2cloud.com

WORKDIR /app

COPY --from=node-static /app .

RUN cp -ar /app/dist/* /usr/share/nginx/html/ \

    && ln -sf /dev/stdout /var/log/nginx/access.log \

	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

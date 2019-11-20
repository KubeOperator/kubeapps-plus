FROM node:latest as node-static

WORKDIR /app

RUN apt-get update

COPY . /app

RUN cd /app && npm install vue -g && yarn install && yarn build



FROM nginx

MAINTAINER support support@fit2cloud.com

WORKDIR /app

COPY --from=node-static /app .

COPY dist/ /usr/share/nginx/html/

RUN ln -sf /dev/stdout /var/log/nginx/access.log \

	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 9090

CMD ["nginx", "-g", "daemon off;"]


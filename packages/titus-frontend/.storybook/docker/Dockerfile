FROM node:12 as builder

WORKDIR /service

COPY package.json package-lock.json ./
COPY src ./src
COPY .storybook ./.storybook

RUN npm ci

RUN npm run storybook:build

FROM nginx:stable-alpine

COPY .storybook/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .storybook/docker/nginx.htpasswd /etc/nginx/conf.d/nginx.htpasswd

COPY --from=builder /service/storybook-static /var/www

CMD ["nginx", "-g", "daemon off;"]

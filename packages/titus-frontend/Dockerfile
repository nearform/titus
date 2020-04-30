FROM node:12 as builder

WORKDIR /service

COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public

ENV SKIP_PREFLIGHT_CHECK=true
RUN npm ci

ARG REACT_APP_API_URL
RUN npm run build

FROM nginx:stable-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /service/build/ /var/www

CMD ["nginx", "-g", "daemon off;"]

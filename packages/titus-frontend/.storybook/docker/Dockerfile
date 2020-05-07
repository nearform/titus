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

# implement changes required to run NGINX as an unprivileged user
RUN sed -i -e '/user/!b' -e '/nginx/!b' -e '/nginx/d' /etc/nginx/nginx.conf \
    && sed -i 's!/var/run/nginx.pid!/tmp/nginx.pid!g' /etc/nginx/nginx.conf \
    && sed -i "/^http {/a \    proxy_temp_path /tmp/proxy_temp;\n    client_body_temp_path /tmp/client_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;\n" /etc/nginx/nginx.conf \
# nginx user must own the cache directory to write cache
    && chown -R 101:0 /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx

USER 101

CMD ["nginx", "-g", "daemon off;"]

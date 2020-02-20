FROM node:12-alpine as builder

WORKDIR /service

COPY package.json package-lock.json ./
COPY lib ./lib
COPY index.js ./index.js

RUN npm ci

CMD ["node", "index.js"]

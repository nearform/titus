FROM node:14-alpine as builder

WORKDIR /service

COPY package.json package-lock.json ./
COPY lib ./lib
COPY index.js ./index.js

RUN npm ci

USER node

CMD ["node", "index.js"]

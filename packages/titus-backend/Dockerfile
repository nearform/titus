FROM node:16-alpine as builder
RUN apk add dumb-init
ENV NODE_ENV production

WORKDIR /service

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node lib ./lib
COPY --chown=node:node index.js ./index.js

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "index.js"]

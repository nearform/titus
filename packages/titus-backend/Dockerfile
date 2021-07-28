FROM node:lts-alpine@sha256:fb6cb918cc72869bd625940f42a7d8ae035c4e786d08187b94e8b91c6a534dfd as builder
RUN apk add dumb-init
ENV NODE_ENV production

WORKDIR /service

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node lib ./lib
COPY --chown=node:node index.js ./index.js

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "index.js"]

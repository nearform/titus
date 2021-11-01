FROM node:14-alpine as builder
RUN apk add dumb-init
ENV NODE_ENV production

WORKDIR /service

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node dist ./dist

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "dist/index.js"]

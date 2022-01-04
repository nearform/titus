FROM node:16-alpine as builder
ENV NODE_ENV production
WORKDIR /service
COPY --chown=node:node package.json package-lock.json index.js ./
COPY --chown=node:node lib lib
RUN apk upgrade --available && \
    apk add dumb-init && \
    rm -rf /var/cache/apk/*
RUN npm ci --only=production
USER node
CMD ["dumb-init", "node", "index.js"]

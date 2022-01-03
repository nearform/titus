FROM node:16.13.1-alpine3.14
ENV NODE_ENV production
WORKDIR /titus-db-manager
COPY --chown=node:node package.json package-lock.json index.js migration-start.js ./
COPY --chown=node:node lib lib
COPY --chown=node:node seed seed
COPY --chown=node:node migrate migrate
COPY --chown=node:node truncate truncate
RUN apk upgrade --available && \
    apk add dumb-init && \
    rm -rf /var/cache/apk/* && \
    npm ci --only=production
USER node
CMD ["dumb-init", "node", "./lib"]

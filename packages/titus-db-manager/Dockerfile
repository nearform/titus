FROM node:14-alpine
RUN apk add bash dumb-init
ENV NODE_ENV production

WORKDIR /titus-db-manager

COPY --chown=node:node index.js /titus-db-manager/index.js
COPY --chown=node:node migration-start.js /titus-db-manager/migration-start.js
COPY --chown=node:node seed /titus-db-manager/seed
COPY --chown=node:node migrate /titus-db-manager/migrate
COPY --chown=node:node truncate /titus-db-manager/truncate
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node lib /titus-db-manager/lib

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "./lib"]

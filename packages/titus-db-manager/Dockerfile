FROM node:14-alpine

WORKDIR /titus-db-manager
USER root
# install utils and deps
RUN apk add bash postgresql-client
# Copy the server code
COPY index.js /titus-db-manager/index.js
COPY migration-start.js /titus-db-manager/migration-start.js
COPY seed /titus-db-manager/seed
COPY migrate /titus-db-manager/migrate
COPY truncate /titus-db-manager/truncate
# COPY node_modules /titus-db-manger/node_modules
COPY package.json /titus-db-manager/package.json
COPY lib /titus-db-manager/lib

# Run npm install
RUN npm install
# Run server

USER node

CMD ["npm", "run", "db:server:start"]

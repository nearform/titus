FROM node:10-alpine

WORKDIR /titus-db-manager
USER root

# Copy the server code
COPY index.js /titus-db-manager/index.js
COPY lib /titus/lib
COPY node_modules /titus-db-manger/node_modules
COPY package.json /titus-db-manager/package.json

# Run migrations
CMD npm run db:migrate

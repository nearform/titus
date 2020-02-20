FROM node:10-alpine

WORKDIR /service
USER root

# Copy the server code
COPY index.js /service/index.js
COPY lib /service/lib
COPY node_modules /service/node_modules
COPY package.json /service/package.json

# Start the server
CMD npm run start

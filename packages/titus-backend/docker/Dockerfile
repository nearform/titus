FROM node:10-alpine

WORKDIR /titus
USER root

# Copy the server code
COPY index.js /titus/index.js
COPY lib /titus/lib
COPY node_modules /titus/node_modules
COPY package.json /titus/package.json

# Start the server
CMD npm run start

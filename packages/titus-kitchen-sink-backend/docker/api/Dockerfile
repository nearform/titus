FROM nearform/alpine3-s2i-nodejs

WORKDIR /titus
USER root

# Postgresql client is needed to poll db from cli
RUN apk upgrade && apk add postgresql-client && apk add bash

# Copy the server code
COPY config /titus/config
COPY index.js /titus/index.js
COPY lib /titus/lib
COPY node_modules /titus/node_modules
COPY package.json /titus/package.json
COPY tools /titus/tools

# Copy the startup script
COPY docker/startServer-development.sh /titus/startServer.sh

# Start the server
CMD ["sh", "startServer.sh"]

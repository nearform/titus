FROM node:10-alpine

WORKDIR /titus
USER root

COPY config config
COPY docker docker
COPY lib lib
COPY node_modules node_modules
COPY tools tools
COPY index.js theming.js

# Postgresql client is needed to poll db from cli
RUN apk add postgresql-client && apk add bash

# Poll db to ensure it is up before proceeding
CMD ./docker/startServer-$NODE_ENV.sh

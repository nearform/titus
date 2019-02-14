FROM nearform/alpine3-s2i-nodejs

WORKDIR /titus
USER root

# Postgresql client is needed to poll db from cli
RUN apk upgrade && apk add postgresql-client

# Poll db to ensure it is up before proceeding
CMD ./docker/startServer-$NODE_ENV.sh

#!/bin/bash

# Assumes PG* env variables have been defined
until psql -q -c '\q'; do
  >&2 echo "Waiting for Postgres to start..."
  sleep 1
done
>&2 echo "Postgres is up - starting server..."

npm run initdb
npm run migrate
npm run start

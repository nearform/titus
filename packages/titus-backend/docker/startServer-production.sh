#!/bin/bash
export PGHOST=$PGHOST
export PGPORT=$PGPORT
export PGUSER=$POSTGRES_USER
export PGPASSWORD=$POSTGRES_PASSWORD
export PGDATABASE=$POSTGRES_DB
export REACT_APP_S3_UPLOADER_ENDPOINT=$REACT_APP_S3_UPLOADER_ENDPOINT

until psql -q -c '\q'; do
  >&2 echo "Waiting for Postgres to start..."
  sleep 1
done
>&2 echo "Postgres is up - starting server..."

npm run initdb
npm run migrate
npm run start

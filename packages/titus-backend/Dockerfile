FROM node:lts-alpine@sha256:fb6cb918cc72869bd625940f42a7d8ae035c4e786d08187b94e8b91c6a534dfd as builder

WORKDIR /service

COPY package.json package-lock.json ./
COPY lib ./lib
COPY index.js ./index.js

RUN npm ci --only=production

USER node

CMD ["node", "index.js"]

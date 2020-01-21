FROM node:10-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
CMD ["node", "./index", "migrate"]

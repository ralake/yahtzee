# This stage installs our modules
FROM node:12
WORKDIR /app
COPY . ./
# Don't install dev dependencies
RUN npm install
RUN npm run build

# Multi-stage build: Use this as a nice small base image
FROM mhart/alpine-node:slim-12
WORKDIR /app
# Copy files from build image
COPY --from=0 /app .
COPY . .
CMD ["node", "src/Server.bs.js"]

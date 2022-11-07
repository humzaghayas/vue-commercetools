# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
# FROM node:16-slim

# # Create and change to the app directory.
# WORKDIR E:/workspace2/Vue-Commercetools/drl-ct

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure both package.json AND package-lock.json are copied.
# # Copying this separately prevents re-running npm install on every code change.
# COPY package*.json ./

# # Install production dependencies.
# RUN yarn install

# RUN yarn build

# # Copy local code to the container image.
# COPY . ./

# # Run the web service on container startup.
# CMD [ "yarn", "start" ]

FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . ./

RUN yarn build
# EXPOSE 3000

# ENV NUXT_HOST=0.0.0.0
ENV PORT=3000


CMD [ "yarn", "start" ]
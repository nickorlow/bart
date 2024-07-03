FROM node:22.2.0 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN ls -la
ENTRYPOINT ["node", "/app/build/index.js"]

FROM node:13.8.0-stretch
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
ENTRYPOINT ["node", "index.js"]

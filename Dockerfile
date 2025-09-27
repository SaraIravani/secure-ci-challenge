# Dockerfile
FROM node:16

WORKDIR /app

# copy package manifest first to leverage layer cache and install vulnerable deps
COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]

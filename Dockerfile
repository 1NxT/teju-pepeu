FROM node:alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

ARG TOKEN 
ARG CLIENT_ID 
ARG GUILD_ID 
ARG ADMIN_ID 
ARG MONGODB_URL 
ARG MONGODB_DATABASE 

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node" , "index.js" ]
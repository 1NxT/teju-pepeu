FROM node:alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node" , "index.js" ]
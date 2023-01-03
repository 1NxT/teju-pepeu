FROM node:alpine

RUN apk add  --no-cache ffmpeg

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "node" , "index.js" ]
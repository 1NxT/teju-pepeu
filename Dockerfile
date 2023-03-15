FROM node:alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

ENV TOKEN ${TOKEN} 
ENV CLIENT_ID ${CLIENT_ID} 
ENV GUILD_ID ${GUILD_ID} 
ENV ADMIN_ID ${ADMIN_ID} 
ENV MONGODB_URL ${MONGODB_URL} 
ENV MONGODB_DATABASE ${MONGODB_DATABASE} 

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node" , "index.js" ]
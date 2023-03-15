FROM node:alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

ENV TOKEN=Njg1Mjk1NDA0ODIwMzMyNTU2.GMo-fa.R_7DJHlSHx6inlqbV-WRB0DREnM_V9ehCz1Sz0
ENV CLIENT_ID=685295404820332556
ENV GUILD_ID=420322549948219393
ENV ADMIN_ID=489776174742896640
ENV MONGODB_URL=mongodb+srv://teju-pepeu:3EKxVWsvBAyNnpg9@teju-pepeu.4docegs.mongodb.net/?retryWrites=true&w=majority
ENV MONGODB_DATABASE=discord_data

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node" , "index.js" ]
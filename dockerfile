FROM node:lts-alpine

RUN mkdir /front
WORKDIR /front
COPY package*.json yarn.lock ./
RUN yarn --network-timeout 100000
COPY next.config.js  ./next.config.js

CMD ["yarn" ,"dev"]
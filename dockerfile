FROM node:lts-alpine

RUN mkdir /front
WORKDIR /front
COPY package*.json yarn.lock ./
RUN yarn
COPY next.config.js  ./next.config.js

CMD ["yarn" ,"dev"]
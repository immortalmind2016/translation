FROM node:alpine

WORKDIR /user/app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .


CMD ["yarn","start:dev"]
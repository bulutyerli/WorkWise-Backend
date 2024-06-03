FROM node:20-alpine as dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

FROM dependencies as builder

RUN npm run build

CMD [ "npm", "run", "start" ]

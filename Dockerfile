FROM node:9-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
ADD webpack.config.js /usr/src/app

RUN npm i -q

ENV NODE_ENV=production

ADD tsconfig.json .
ADD tsconfig.server.json .

ADD server.ts /usr/src/app
ADD src /usr/src/app/
ADD dist /usr/src/app

RUN npm run build

CMD npm run start

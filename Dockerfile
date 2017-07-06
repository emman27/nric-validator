FROM node:8

WORKDIR /app

COPY package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org/ && npm install

COPY ./controllers /app/controllers
COPY ./views /app/views
COPY ./test /app/tests
COPY ./server.js /app/server.js

EXPOSE 3000

CMD ["npm", "start"]

FROM alpine:latest

ENV APP_PORT=3000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm","start"]
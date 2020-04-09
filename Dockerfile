FROM node:13.12.0

WORKDIR /app

COPY ./client/package*.json ./client/

RUN cd client && npm install

COPY ./client ./client/

COPY frontend.env ./client/.env

RUN cd client && npm run build

COPY ./server/package*.json ./server/

RUN cd server && npm install

COPY ./server ./server/

WORKDIR /app/server

CMD ["npm", "run", "start"]

EXPOSE 8080




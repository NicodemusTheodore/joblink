FROM node:lts-hydrogen

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "app.js"]
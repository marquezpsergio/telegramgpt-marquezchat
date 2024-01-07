FROM node:20.10.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 3000
CMD ["node", "telegram_gpt.js"]

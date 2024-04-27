FROM node:20.12.1

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD ["npm", "start"]

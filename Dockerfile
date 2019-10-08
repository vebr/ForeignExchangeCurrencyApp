FROM node:10

WORKDIR ./

RUN npm install

EXPOSE 3000

CMD ["npm start"]

FROM node:14
WORKDIR /zebra-backend
COPY package.json /zebra-backend
RUN npm install
COPY  . /zebra-backend
CMD node app.js
EXPOSE 5000
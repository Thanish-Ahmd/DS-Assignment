FROM node:alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 8084

CMD ["npm" , "start"] 

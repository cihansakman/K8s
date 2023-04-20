FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install

# copying all files in our project
COPY . .

#Start the application
CMD npm start

FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./webserver/package.json /usr/src/app/
RUN npm install

# Copy app
COPY ./webserver/Communicate/ /usr/src/app/Communicate
COPY ./webserver/Data/ /usr/src/app/Data
COPY ./webserver/Database/ /usr/src/app/Database
COPY ./webserver/Domain/ /usr/src/app/Domain
COPY ./webserver/Entity/ /usr/src/app/Entity
COPY ./webserver/Scripts /usr/src/app/Scripts
COPY ./webserver/Utility /usr/src/app/Utility
COPY ./webserver/app.js /usr/src/app/

EXPOSE 8080

CMD [ "npm", "start" ]
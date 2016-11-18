FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./webserver/package.json /usr/src/app/
RUN npm install

# Bundle app sourcedocker
COPY ./webserver/Domain/ /usr/src/app/Domain
COPY ./webserver/files /usr/src/app/files
COPY ./webserver/Scripts /usr/src/app/Scripts
COPY ./webserver/Utility /usr/src/app/Utility
COPY ./webserver/app.js /usr/src/app/

EXPOSE 8080
CMD [ "npm", "start" ]
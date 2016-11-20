#!/bin/sh

#build image
docker build -t "u2668/node-js-backend" .

#publish image
docker push "u2668/node-js-backend"

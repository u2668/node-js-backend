#!/bin/sh
imageName="u2668/node-js-backend"
docker build -t ${imageName} .
docker push ${imageName}


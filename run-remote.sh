#!/bin/sh
# remote
deployAddress="46.101.204.43"
containerName="backend"
imageName="u2668/node-js-backend"
ssh root@${deployAddress} docker rm -f ${containerName}
ssh root@${deployAddress} docker pull ${imageName}
ssh root@${deployAddress} docker run --net go-to-canteen -d -p 1331:1331 --name ${containerName}  ${imageName}

#!/bin/sh
# remote
deployAddress="46.101.187.150"
containerName="backend"
imageName="u2668/node-js-backend"
ssh root@${deployAddress} docker rm -f ${containerName}
ssh root@${deployAddress} docker pull ${imageName}
ssh root@${deployAddress} docker run \
		-d \
		-p 8080:8080 \
		--env CHAT_BOT_ENDPOINT=http://ad73af87.ngrok.io/notifications \
		--name ${containerName} \
		${imageName}

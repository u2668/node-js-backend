#!/bin/sh
containerName="backend"
imageName="u2668/node-js-backend"
docker rm -f ${containerName}
docker run \ 
		--name ${containerName} \ 
		--net go-to-canteen \
		-d \
		-p 8080:8080 \
		--env CHAT_BOT_ENDPOINT=http://ad73af87.ngrok.io/notifications \
		--name ${containerName} \
		${imageName}


# for debug
#docker run -it u2668/node-js-backend /bin/bash
#docker exec -it backend /bin/bash

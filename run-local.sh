#!/bin/sh
containerName="backend"
imageName="u2668/node-js-backend"
docker rm -f ${containerName}
docker run --name ${containerName} --net go-to-canteen -d -p 1331:1331 ${imageName}

# for debug
#docker run -it u2668/node-js-backend /bin/bash
#docker exec -it backend /bin/bash

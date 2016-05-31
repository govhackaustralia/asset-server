#!/usr/bin/env sh

pm2 start /usr/bin/http-server --name govhack-asset-server -- -p 3010 --cors
#pm2 start /usr/bin/http-server --name my-file-server -- -p 8080 -d false --cors

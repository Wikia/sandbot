#!/bin/bash
env SANDBOT_TOKEN="$SECRET_APP_SANDBOT_DEV______________"
set -e 
if [ "$1" = 'SANDBOT' ]; then
    chown -R node:node /usr/sandbot
    cd /usr/sandbot; npm run bot
fi
exec "$@"
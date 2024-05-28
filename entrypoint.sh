#!/usr/bin/env/ bash
set -e
. /var/lib/secrets/export.env
export SANDBOT_TOKEN=$SECRET_APP_SANDBOT_DEV______________
cd db && node startup-setup.js && cd ..
npm run bot
exec "$@"

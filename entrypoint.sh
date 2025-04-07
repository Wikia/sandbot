#!/usr/bin/env/ bash
set -e
. /var/lib/secrets/export.env
export SLACK_APP_TOKEN=$SECRET_APP_SANDBOT_DEV______________
export SLACK_BOT_TOKEN=$SECRET_APP_SANDBOT_DEV______________
export SLACK_SIGNING_SECRET=$SECRET_APP_SANDBOT_DEV______________
cd db && node startup-setup.js && cd ..
npm run bot
exec "$@"

#!/usr/bin/env/ bash
set -e
. /var/lib/secrets/export.env
export SANDBOT_TOKEN=$SECRET_APP_SANDBOT_DEV______________
npm run bot
exec "$@"

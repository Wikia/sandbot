#!/usr/bin/env/ bash
set -e
. /var/lib/secrets/export.env
cd db && node startup-setup.js && cd ..
npm run bot
exec "$@"

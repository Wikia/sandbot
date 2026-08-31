const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('service-social-platform-dev-pl', '${channels.PANDORA_DEV_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('service-social-platform-dev-sjc', '${channels.PANDORA_DEV_CHANNEL_ID}', '', null);`);

  console.log('Social platform pandora dev env reservation.');

  db.close();
});

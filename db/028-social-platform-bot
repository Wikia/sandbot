const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('social-platform-dev-pl', '${channels.SOCIAL_PLATFORM_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('social-platform-dev-sjc', '${channels.SOCIAL_PLATFORM_CHANNEL_ID}', '', null);`);

  console.log('Social platform pandora dev env reservation.');

  db.close();
});

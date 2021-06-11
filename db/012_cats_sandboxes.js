const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-cats1', '${channels.CATS_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-cats2', '${channels.CATS_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-cats3', '${channels.CATS_CHANNEL_ID}', '');`);

  console.log('CATS sandboxes added.');

  db.close();
});

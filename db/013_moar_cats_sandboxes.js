const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-cats4', '${channels.UGC_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-cats5', '${channels.UGC_CHANNEL_ID}', '');`);

  console.log('CATS sandboxes 4-5 added.');

  db.close();
});

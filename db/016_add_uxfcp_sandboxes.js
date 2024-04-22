const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-whatever', '${channels.IWING_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-dune', '${channels.IWING_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-fox', '${channels.IWING_CHANNEL_ID}', '');`);

  console.log('I-Wing sandboxes added.');

  db.close();
});

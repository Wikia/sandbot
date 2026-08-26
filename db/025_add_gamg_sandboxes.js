const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-gamg1', '${channels.GAMING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-gamg2', '${channels.GAMING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-gamg3', '${channels.GAMING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-gamg4', '${channels.GAMING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-gamg5', '${channels.GAMING_CHANNEL_ID}', '', null);`);

  console.log('GAMG sandboxes added.');

  db.close();
});

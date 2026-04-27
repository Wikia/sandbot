const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-1', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-2', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-3', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-4', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-5', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-6', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-7', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-8', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-fandom', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-adeng', '${channels.IWING_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('f2-sandbox-qa', '${channels.IWING_CHANNEL_ID}', '', null);`);

  console.log('F2 sandboxes added.');

  db.close();
});

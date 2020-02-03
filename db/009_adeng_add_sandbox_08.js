const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-adeng08', '${channels.ADENG_CHANNEL_ID}', '');`);

  console.log('AdEng sandbox 08 added.');

  db.close();
});

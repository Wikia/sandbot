const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-s8', '${channels.ADENG_CHANNEL_ID}', '');`);
  console.log('AdEng sandbox s8 added.');
  db.run("DELETE FROM sandboxes WHERE sandbox = 'sandbox-adeng';");
  db.run(`INSERT INTO sandboxes VALUES('sandbox-adeng', '${channels.ADENG_CHANNEL_ID}', '');`);

  console.log('AdEng sandbox order changed');

  db.close();
});

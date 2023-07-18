const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`UPDATE sandboxes SET sandbox = 'sandbox-ugc1' WHERE sandbox = 'sandbox-cats1';`);
  db.run(`UPDATE sandboxes SET sandbox = 'sandbox-ugc2' WHERE sandbox = 'sandbox-cats2';`);
  db.run(`UPDATE sandboxes SET sandbox = 'sandbox-ugc3' WHERE sandbox = 'sandbox-cats3';`);
  db.run(`UPDATE sandboxes SET sandbox = 'sandbox-ugc4' WHERE sandbox = 'sandbox-cats4';`);
  db.run(`UPDATE sandboxes SET sandbox = 'sandbox-ugc5' WHERE sandbox = 'sandbox-cats5';`);
  // Let this be a souvenir of the past
  db.run(`INSERT INTO sandboxes VALUES('sandbox-kuweta', '${channels.UGC_CHANNEL_ID}', '');`);

  console.log('CATS sandboxes renamed to UGC (+ kuweta added)');

  db.close();
});

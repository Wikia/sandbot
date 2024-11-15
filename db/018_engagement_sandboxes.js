const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-en1', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-en2', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-en3', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '');`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-en4', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '');`);

  console.log('Sandbot sandboxes added.');

  db.close();
});

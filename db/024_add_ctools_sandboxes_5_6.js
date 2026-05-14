const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-ctools5', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-ctools6', '${channels.CONSUMER_TOOLS_CHANNEL_ID}', '', null);`);

  console.log('Added sandbox-ctools5 and sandbox-ctools6.');

  db.close();
});

const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`INSERT INTO sandboxes VALUES('sandbox-tvmov1', '${channels.TV_MOVIES_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-tvmov2', '${channels.TV_MOVIES_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-tvmov3', '${channels.TV_MOVIES_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-tvmov4', '${channels.TV_MOVIES_CHANNEL_ID}', '', null);`);
  db.run(`INSERT INTO sandboxes VALUES('sandbox-tvmov5', '${channels.TV_MOVIES_CHANNEL_ID}', '', null);`);

  console.log('TV Movies sandboxes added.');

  db.close();
});

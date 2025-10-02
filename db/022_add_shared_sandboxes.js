const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
    db.run(`INSERT INTO sandboxes VALUES('sandbox-public-adeng1', '${channels.ADENG_CHANNEL_ID}', '');`);
    db.run(`INSERT INTO sandboxes VALUES('sandbox-public-adeng2', '${channels.ADENG_CHANNEL_ID}', '');`);
    db.run(`INSERT INTO sandboxes VALUES('sandbox-public-xw1', '${channels.IWING_CHANNEL_ID}', '');`);

    console.log('Shared sandboxes added.');

    db.close();
});

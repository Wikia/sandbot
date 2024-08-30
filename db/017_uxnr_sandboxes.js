const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
    db.run(`INSERT INTO sandboxes VALUES('sandbox-uxnr1', '${channels.UXNR_CHANNEL_ID}', '');`);
    db.run(`INSERT INTO sandboxes VALUES('sandbox-uxnr2', '${channels.UXNR_CHANNEL_ID}', '');`);
    db.run(`INSERT INTO sandboxes VALUES('sandbox-uxnr3', '${channels.UXNR_CHANNEL_ID}', '');`);

    console.log('UXNR sandboxes added.');

    db.close();
});

const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
    db.run(`INSERT INTO sandboxes VALUES('neutron-api-dev', '${channels.UXNR_CHANNEL_ID}', '');`);
    db.run(`INSERT INTO sandboxes VALUES('neutron-api-stage', '${channels.UXNR_CHANNEL_ID}', '');`);

    console.log('Neutron-api dev/stage added.');

    db.close();
});

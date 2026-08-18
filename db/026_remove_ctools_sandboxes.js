const db = require('./connection');

db.serialize(() => {
  db.run(`DELETE FROM sandboxes WHERE sandbox LIKE 'sandbox-ctools%';`);

  console.log('Removed all ctools sandboxes.');

  db.close();
});

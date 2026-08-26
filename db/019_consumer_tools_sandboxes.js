const db = require('./connection');

db.serialize(() => {
  db.run('UPDATE sandboxes SET sandbox = \'sandbox-ctools1\' WHERE sandbox = \'sandbox-en1\';');
  db.run('UPDATE sandboxes SET sandbox = \'sandbox-ctools2\' WHERE sandbox = \'sandbox-en2\';');
  db.run('UPDATE sandboxes SET sandbox = \'sandbox-ctools3\' WHERE sandbox = \'sandbox-en3\';');
  db.run('UPDATE sandboxes SET sandbox = \'sandbox-ctools4\' WHERE sandbox = \'sandbox-en4\';');

  console.log('Updated EN sandboxes to CTOOLS.');

  db.close();
});

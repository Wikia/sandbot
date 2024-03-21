const db = require('./connection');
const channels = require('../channels');

db.serialize(() => {
  db.run(`UPDATE sandboxes SET team = 'C0GV00TC4' WHERE team = 'G0GV00TC4';`);

  console.log('AdEng slack ID has been updated.');

  db.close();
});

const db = require('./connection');

db.run('ALTER TABLE sandboxes ADD COLUMN assigned_at TEXT', (alterErr) => {
  if (alterErr) {
    console.error('Failed to add assigned_at column:', alterErr);
    return;
  }

  console.log("Added 'assigned_at' column.");
});

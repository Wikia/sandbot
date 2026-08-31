const Promise = require('bluebird');
const db = require('../db/connection');

/**
 * Retrieves the status of sandboxes for a given channel.
 *
 * @param {string} channel - The channel identifier to filter sandboxes by team.
 * @returns {
 *  Promise<{result: Object.<string, {owner: string, assigned_at: number}>}>
 * }
 */
function getStatus(channel) {
  return new Promise(((resolve, reject) => {
    db.all(
      'SELECT sandbox, owner, assigned_at FROM sandboxes WHERE team = $teamChannel',
      { $teamChannel: channel },
      (err, rows) => {
        if (err) {
          reject(err);
        }

        const result = {};

        rows.forEach((row) => {
          if (row.sandbox) {
            result[row.sandbox] = {
              owner: row.owner,
              assigned_at: row.assigned_at,
            };
          } else {
            console.log('Invalid row.');
          }
        });

        resolve({ result });
      },
    );
  }));
}

module.exports = getStatus;

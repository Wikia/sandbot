const Promise = require('bluebird');
const db = require('../db/connection');

/**
 * @typedef {Object} SandboxStatusRow
 * @property {string} sandbox - The sandbox identifier.
 * @property {string} owner - The Slack user ID of the owner (nullable).
 * @property {string} assigned_at - The ISO date string when the sandbox was assigned (nullable).
 */

/**
 * Retrieves the status of sandboxes for a given channel.
 *
 * @param {string} channel - The channel identifier to filter sandboxes by team.
 * @returns {Promise<SandboxStatusRow[]>} Resolves with an array of sandbox status rows.
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
            result[row.sandbox] = row.owner;
            result[row.assigned_at] = Date.parse(row.assigned_at);
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

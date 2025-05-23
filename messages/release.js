const Promise = require('bluebird');
const { getSandboxNameFromMessage, getSandboxOwner } = require('../common');
const db = require('../db/connection');

function updateDbWithRelease(sandboxName, channel) {
  return new Promise(((resolve, reject) => {
    db.run(
      "UPDATE sandboxes SET owner = '', assigned_at = '' WHERE team = $teamChannel AND sandbox = $sandboxName",
      { $teamChannel: channel, $sandboxName: sandboxName },
      (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      },
    );
  }));
}

function releaseSandbox(message) {
  let response;
  let sandboxName;

  return new Promise(((resolve, reject) => {
    sandboxName = getSandboxNameFromMessage(message);

    return getSandboxOwner(message.channel, sandboxName)
      .then((sandboxOwner) => {
        if (sandboxOwner.result && sandboxOwner.result !== message.user) {
          response = `:pirate: take over!!! <@${sandboxOwner.result}>, <@${message.user}> is releasing your sandbox! :pirate:`;

          return updateDbWithRelease(sandboxName, message.channel)
            .then(() => {
              resolve({
                response,
                data: {},
              });
            });
        }

        return updateDbWithRelease(sandboxName, message.channel)
          .then(() => {
            resolve({
              data: {},
            });
          });
      })
      .catch((err) => { reject(err); });
  }));
}

module.exports = {
  pattern: /(zwalniam|releasing) (sandbox|adeng|neutron-api)-|^[zr] (sandbox|adeng|neutron-api)-/i,
  action({ message, say }) {
    releaseSandbox(message)
      .then((data) => {
        if (data.response) {
          say(data.response);
        } else {
          say(`<@${message.user}> :+1:`);
        }
      }, (err) => {
        say(`:x: sandbot error: \`${err}\`, try again`);
      })
      .catch((err) => {
        say(`:x: sandbot error: \`${err}\`, try again`);
      });
  },
};

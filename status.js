const Promise = require('bluebird');
const request = require('request');
const db = require('./db/connection');

const token = process.env.SANDBOT_TOKEN || '';
const k8sSandboxes = [
  'sandbox-qa01',
  'sandbox-qa02',
  'sandbox-qa03',
  'sandbox-qa04',
];

function getStatus(channel) {
  return new Promise(((resolve, reject) => {
    db.all(
      'SELECT sandbox, owner FROM sandboxes WHERE team = $teamChannel',
      { $teamChannel: channel },
      (err, rows) => {
        if (err) {
          reject(err);
        }

        const result = {};

        rows.forEach((row) => {
          if (row.sandbox) {
            result[row.sandbox] = row.owner;
          } else {
            console.log('Invalid row.');
          }
        });

        resolve({ result });
      },
    );
  }));
}


function getUserNameById(user) {
  return new Promise((resolve) => {
    request(
      {
        url: 'https://slack.com/api/users.info',
        qs: {
          token,
          user,
        },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body).user.name);
        }
      },
    );
  });
}

function parseSandboxStatus(key, value) {
  if (value) {
    return new Promise((resolve) => {
      getUserNameById(value)
        .then((userName) => {
          resolve([key, userName]);
        });
    });
  }

  return [key, 'free'];
}

module.exports = {
  pattern: /sandbot status|^ss$/i,
  action(rtm, message) {
    console.log('Checking status...', message.channel);
    getStatus(message.channel).then((statusData) => {
      console.log('DB results: ', statusData.result);

      const promises = Object.keys(statusData.result)
        .map(key => parseSandboxStatus(key, statusData.result[key]));

      Promise.all(promises).then((data) => {
        let parsedMsg = '';

        data.forEach((item) => {
          if (k8sSandboxes.includes(item[0])) {
            parsedMsg += `[k8s] ${item[0]}: ${item[1]}\n`;
          } else {
            parsedMsg += `${item[0]}: ${item[1]}\n`;
          }
        });

        if (!parsedMsg.length) {
          parsedMsg += `Brak danych. Czy id kanału ${message.channel} jest wciąż aktualny, tej?\n`;
        }

        rtm.sendMessage(`\`\`\`${parsedMsg}\`\`\``, message.channel);
      });
    });
  },
};

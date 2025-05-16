const Promise = require('bluebird');
const request = require('request');
const { getStatus } = require('../api');
const { token } = require('../config');

const k8sSandboxes = [
  'sandbox-qa01',
  'sandbox-qa02',
  'sandbox-qa03',
  'sandbox-qa04',
];

function getUserNameById(user) {
  return new Promise((resolve) => {
    request(
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: 'https://slack.com/api/users.info',
        qs: { user },
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

  return [key, 'FREE'];
}

module.exports = {
  pattern: /sandbot status|^ss$/i,
  action({ logger, message, say }) {
    logger.info('Checking status...', message.channel);
    getStatus(message.channel).then((statusData) => {
      logger.info('DB results: ', statusData.result);

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

        say(`\`\`\`${parsedMsg}\`\`\``);
      });
    });
  },
};

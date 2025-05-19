const Promise = require('bluebird');
const { getStatus, getUserNameById } = require('../api');

const k8sSandboxes = [
  'sandbox-qa01',
  'sandbox-qa02',
  'sandbox-qa03',
  'sandbox-qa04',
];

function parseSandboxStatus(key, value) {
  if (value.owner) {
    return new Promise((resolve) => {
      getUserNameById(value.owner)
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
          parsedMsg += `No data. Is the channel ID ${message.channel} still valid?\n`;
        }

        say(`\`\`\`${parsedMsg}\`\`\``);
      });
    });
  },
};

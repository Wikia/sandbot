const { RTMClient } = require('@slack/client');
const db = require('./db/connection');
const STATUS = require('./status');
const BOOK = require('./book');
const RELEASE = require('./release');
const PING = require('./ping');
const JOKE = require('./joke');
const CHANNEL = require('./channels');

const token = process.env.SANDBOT_TOKEN || '';
const rtm = new RTMClient(token, { logLevel: 'error' });
const ACTIONS = [
  STATUS,
  BOOK,
  RELEASE,
  PING,
  JOKE,
];

console.log('Sandbot activated.');
rtm.start();
console.log('Slack RTM started.');

// Send welcome message to all the channels, only on first ready event
let firstConnectAfterRestart = true;
rtm.on('ready', () => {
  if (!firstConnectAfterRestart) {
    return;
  }
  firstConnectAfterRestart = false;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const channelKey in CHANNEL) {
    try {
      rtm.sendMessage('Sandbot service was restarted!\n'
          + 'basic usage (command, shortcut):\n'
          + 'sandbot status, ss\n'
          + 'biore|taking [SANDBOX_NAME], b|t [SANDBOX_NAME]\n'
          + 'zwalniam|releasing [SANDBOX_NAME], z|r [SANDBOX_NAME]\n'
          + 'snadbot joke, sj', CHANNEL[channelKey]);
    } catch (e) {
      console.error(e);
    }
  }
});

// Listen to incoming messages
rtm.on('message', (message) => {
  if (message.text) {
    ACTIONS.forEach((item) => {
      if (item.pattern.test(message.text)) {
        item.action(rtm, message);
      }
    });
  }
});

function exitHandler() {
  console.log('Closing connection to database.');
  db.close();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

const { App, matchMessage } = require('@slack/bolt');

const messages = require('./messages');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

messages.forEach(async (message) => {
  app.message(matchMessage(message.pattern), async (listener) => {
    const { context, logger } = listener;
    logger.info(`Received message: ${context.matches[0]}`);
    await message.action(listener);
  });
});

(async () => {
  await app.start();
  app.logger.info('⚡️ Sandbot app is running!');
})();

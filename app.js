const { App, matchMessage } = require('@slack/bolt');
const { CronJob } = require('cron');
const channels = require('./channels');
const config = require('./config');
const cronJobs = require('./cron');
const messages = require('./messages');

const app = new App(config);

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

  // Send a message to all channels when the app starts
  try {
    await Promise.all(
      Object.entries(channels).map(async ([, channel]) => {
        const text = ':information_source: Sandbot service is back online!';
        try {
          await app.client.chat.postMessage({ channel, text });
        } catch ({ data }) {
          app.logger.error(`Error sending message to channel ${channel}:`, data.error);
        }
      }),
    );
  } catch (error) {
    app.logger.error('Error starting the app:', error);
  }

  // Schedule cron jobs
  cronJobs
    .map((job) => {
      const jobConfig = job(app, channels);
      jobConfig.jobName = job.name;
      return jobConfig;
    })
    .forEach(({
      cronTime, callback, timeZone = 'UTC', jobName,
    }) => {
      // eslint-disable-next-line no-new
      new CronJob(cronTime, callback, null, true, timeZone);
      app.logger.info(`Cron job started: [${jobName}] ${cronTime} (${timeZone})`);
    });
})();

const { getStatus } = require('../api');

/**
 * Calculates working days (Mon-Fri) between two dates
 */
function getWorkingDaysBetweenDates(start, end) {
  let count = 0;
  while (start < end) {
    const day = start.getDay();
    if (day !== 0 && day !== 6) { // 0: Sunday, 6: Saturday
      count += 1;
    }
    start.setDate(start.getDate() + 1);
  }
  return count;
}

/**
 * Cron job config for overdue sandboxes
 * @param {Object} app - Bolt app instance
 * @param {Object} channels - channels object
 * @returns {Object} { cronTime, callback }
 */
function overdueSandboxesJob(app, channels) {
  return {
    cronTime: '0 9 * * *',
    callback: async () => {
      await Promise.all(
        Object.entries(channels).map(async ([, channel]) => {
          const status = await getStatus(channel);
          const now = new Date();

          const overdueRows = status.filter((row) => {
            if (!row.assigned_at) return false;
            const assignedAt = new Date(row.assigned_at);
            const workingDays = getWorkingDaysBetweenDates(assignedAt, now);
            return workingDays > 5;
          });

          if (overdueRows.length) {
            const mentions = overdueRows.map(row => `<@${row.owner}>`).join(' ');
            const text = ':warning: Reminder: The following sandboxes have been assigned for more than 5 working days. '
              + `Please consider releasing them if possible.\n${mentions}`;
            await app.client.chat.postMessage({ channel, text });
          }
        }),
      );
    },
    timeZone: 'UTC',
  };
}

module.exports = overdueSandboxesJob;

const { getStatus, getUserNameById } = require('../api');

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
 * Returns an array of overdue sandbox objects for a given channel.
 */
async function getOverdueSandboxes(result, currentDate) {
  const overdue = Object.entries(result)
    .filter(([, data]) => {
      if (!data.owner || !data.assigned_at) return false;
      const assignedAt = new Date(data.assigned_at);
      return getWorkingDaysBetweenDates(assignedAt, currentDate) > 5;
    });

  // Resolve owner names in parallel
  return Promise.all(
    overdue.map(async ([sandbox, data]) => ({
      sandbox,
      owner: await getUserNameById(data.owner),
      assigned_at: data.assigned_at,
    })),
  );
}

/**
 * Formats the list of overdue sandboxes for a Slack message.
 */
function formatSandboxesList(sandboxes) {
  return sandboxes
    .map(row => `• \`${row.sandbox}\`: <@${row.owner}>`)
    .join('\n');
}

/**
 * Returns the Slack message to send about overdue sandboxes.
 */
function buildOverdueMessage(sandboxesList) {
  return (
    `${':wave: Przypominajka! Niektóre piaskownice są przypisane od ponad 5 dni roboczych :grimacing:\n'
    + 'Jeśli nie są już potrzebne, zwolnij je – ktoś na pewno się ucieszy :relaxed:\n'}${
      sandboxesList}`
  );
}

function buildNoOverdueMessage() {
  return 'Nie ma piaskownic zajętych dłużej niż 5 dni. Fajnie, dzięki za sprawną rotację! 🙌';
}

/**
 * Cron job config for overdue sandboxes
 * @param {Object} app - Bolt app instance
 * @param {Object} channels - channels object
 * @returns {Object} { cronTime, callback }
 */
function overdueSandboxes(app, channels) {
  return {
    cronTime: '0 9 * * 1-5',
    timeZone: 'UTC',
    callback: async () => {
      const currentDate = new Date();

      await Promise.all(
        Object.entries(channels).map(async ([, channel]) => {
          const { result } = await getStatus(channel);
          const sandboxes = await getOverdueSandboxes(result, currentDate);

          let text;
          if (sandboxes.length) {
            const sandboxesList = formatSandboxesList(sandboxes);
            text = buildOverdueMessage(sandboxesList);
            app.logger.info(`Found ${sandboxes.length} overdue sandboxes in channel ${channel}`);
          } else {
            text = buildNoOverdueMessage();
          }
          await app.client.chat.postMessage({ channel, text });
        }),
      );
    },
  };
}

module.exports = overdueSandboxes;

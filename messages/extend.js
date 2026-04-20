const db = require('../db/connection');
const { getSandboxNameFromMessage } = require('../common');

function getSandboxDetails(channel, sandboxName) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT owner, assigned_at FROM sandboxes WHERE team = $teamChannel AND sandbox = $sandboxName',
      { $teamChannel: channel, $sandboxName: sandboxName },
      (err, row) => {
        if (err || !row) {
          return reject(err || 'sandbox does not exist');
        }
        return resolve(row);
      },
    );
  });
}

function updateAssignedAt(channel, sandboxName, newAssignedAt) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE sandboxes SET assigned_at = $newAssignedAt WHERE team = $teamChannel AND sandbox = $sandboxName',
      {
        $newAssignedAt: newAssignedAt.toUTCString(),
        $teamChannel: channel,
        $sandboxName: sandboxName,
      },
      (err) => {
        if (err) return reject(err);
        return resolve();
      },
    );
  });
}

function addWorkingDays(startDate, workingDays) {
  const date = new Date(startDate.getTime());
  let remaining = workingDays;
  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      remaining -= 1;
    }
  }
  return date;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

module.exports = {
  pattern: /(przedluzam|extending) (sandbox|adeng|neutron-api)-|^[pe] (sandbox|adeng|neutron-api)-/i,
  action({ message, say }) {
    const sandboxName = getSandboxNameFromMessage(message);
    let msg = `<@${message.user}> `;

    if (!sandboxName) {
      say(`${msg}:x: - can't find sandbox name in your message`);
      return;
    }

    getSandboxDetails(message.channel, sandboxName)
      .then(async ({ owner }) => {
        if (!owner) {
          msg += ':-1: - sandbox is not currently booked';
          say(msg);
          return;
        }
        if (owner !== message.user) {
          msg += `:-1: - <@${owner}> is using it`;
          say(msg);
          return;
        }

        // Reset assigned_at to now to grant a fresh 5 working day window
        const now = new Date();
        await updateAssignedAt(message.channel, sandboxName, now);
        const due = addWorkingDays(now, 5);

        msg += `:+1: (extended, new due date _${formatDate(due)}_)`;
        say(msg);
      })
      .catch((err) => {
        say(`:x: sandbot error: \`${err}\`, try again`);
      });
  },
};

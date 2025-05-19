const Promise = require('bluebird');
const request = require('request');
const { token } = require('../config');

function getUserNameById(userId) {
  return new Promise((resolve) => {
    request(
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: 'https://slack.com/api/users.info',
        qs: { user: userId },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body).user.name);
        }
      },
    );
  });
}

module.exports = getUserNameById;

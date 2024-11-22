const request = require('request');

module.exports = {
  pattern: /sandbot joke|^sj/i,
  action(rtm, message) {
    request(
      {
        url: 'https://api.chucknorris.io/jokes/random',
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const json = JSON.parse(body);

          rtm.sendMessage(json.value, message.channel);
        }
      },
    );
  },
};

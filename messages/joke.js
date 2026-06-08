const request = require('request');

module.exports = {
  pattern: /sandbot joke|^sj/i,
  action({ say }) {
    request(
      {
        url: 'https://icanhazdadjoke.com/',
        headers: {
          Accept: 'application/json',
        },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const json = JSON.parse(body);

          say(json.joke);
        }
      },
    );
  },
};

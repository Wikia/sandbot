module.exports = {
  pattern: /sandbot (zyjesz|ping)\?/i,
  async action({ logger, say }) {
    logger.info('Pong!');
    await say('No ba! Żyję, ziom! :+1:');
  },
};

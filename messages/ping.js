module.exports = {
  pattern: /sandbot (zyjesz|ping)\?/i,
  async action({ logger, say }) {
    logger.info('Pong!');
    await say('For sure! Still alive, my dude! :+1:');
  },
};

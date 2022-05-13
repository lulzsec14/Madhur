const logger = require('pino');
const dayjs = require('dayjs');
const config = require('config');

const level = config.get('logLevel');

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level,
  base: { pid: false },
  timestamp: () => `,"time":" ${dayjs().format()}"`,
});

module.exports = log;

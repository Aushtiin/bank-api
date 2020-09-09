const winston = require('winston');

//const format = winston.format.cli({ colors: { info: "cyan", error: "red" } });
const colorizer = winston.format.colorize();

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) =>
    colorizer.colorize(
      info.level,
      `${info.timestamp} - [${info.level}]: ${info.message}`
    )
  )
);

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "debug" })],
  format: format,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.debug(message);
  },
};
module.exports = logger;
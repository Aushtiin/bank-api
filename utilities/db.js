const mongoose = require("mongoose");
const logger = require('./logger');

const mongodb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = mongodb;
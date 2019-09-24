require('dotenv').config();

const { MONGO_URI, MONGO_PASSWORD, SESSION_SECRET, PORT } = process.env;

module.exports = { MONGO_URI, MONGO_PASSWORD, SESSION_SECRET, PORT };

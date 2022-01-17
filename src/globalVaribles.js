const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    userDB: process.env.DB_USER,
    passwordDB: process.env.DB_PASSWORD
};
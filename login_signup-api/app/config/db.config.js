require('dotenv').config();
const { createPool } = require('mysql');
const connection = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    port: process.env.dbPort,
    database: process.env.database,
    multipleStatements: true,
  connectionLimit: 10,
  dialect: 'mysql',
});
module.exports = connection;
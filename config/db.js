const sql = require('mssql');
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: true }
};
module.exports = new sql.ConnectionPool(config).connect();
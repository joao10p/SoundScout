const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'AOlZ2PiCPa',
  password: 'c72uob9rs6',
  database: 'AOlZ2PiCPa'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;

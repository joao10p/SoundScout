const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'AOlZ2PiCPa',
  password: '37Oyo5ySZF',
  database: 'AOlZ2PiCPa'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;

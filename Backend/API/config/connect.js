const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'FXiUaR8ZfV',
  password: 'rbgLJSRdPY',
  database: 'FXiUaR8ZfV'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '188.188.188.188',
  user: 'soun_final',
  password: 'Bc1tt7vCA3qa6bbg',
  database: 'soun_final'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;

var mysql = require('mysql');


exports.pool  = mysql.createPool({
  connectionLimit : 3,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'masterdetail'
});


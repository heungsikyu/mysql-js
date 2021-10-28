var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'masterdetail' 
});

connection.connect((err) => {
  if(err){
    console.error(`error connectiong: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

connection.query('SELECT 1 + 1 AS solution',  (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end((err) => {
  console.log(`connection end `);
});

//connection.destroy();

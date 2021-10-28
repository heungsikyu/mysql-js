var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 3,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'masterdetail'
});

pool.getConnection((error, connection) => {
    if(error) throw error;

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        connection.release();
      });

});


pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query('SELECT * FROM master', function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });


  pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });

  pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
  });

  pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
  });

  pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
  });

  pool.end(function (err) {
    // all connections in the pool have ended
  });

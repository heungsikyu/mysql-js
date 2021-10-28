const { pool } = require("./conpool");

pool.getConnection((error, connection) => {
    if(error) throw error;

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        connection.release();
      });

});


pool.getConnection((error, connection) =>{
    if(error) throw error;
    connection.query('INSERT INTO master VALUES(LAST_INSERT_ID(),"0018","2", now())', (error, result, fields) => {
        if(error){
            console.log(`error : ${error} `);
        }else{
            console.log(result, fields);
        }   
        connection.release();

    });
});

// pool.query(
//     'INSERT INTO master VALUES(LAST_INSERT_ID(),"0013","1", now())', (error, result, fields) => {
//    if(error){
//        console.log('error : ' + error);
//    }

//     console.log(result);

// });
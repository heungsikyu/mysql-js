const { pool } = require('./conpool');


pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.beginTransaction((err) => {
        if(err) throw err;
        connection.query('INSERT INTO master VALUES(LAST_INSERT_ID(),"0007","2", now())', (error, results, fields) => {
            if (error) {
                return connection.rollback(() => {
                    throw error;
                });
            }
            var lastId = 'master id ' + results.insertId +' 추가됨 ';
            connection.query('INSERT INTO detail(id, prodCode, prodSize, prodColor, qty, boxNum, master_id) VALUES (LAST_INSERT_ID(),"112121", "xxl", "blue",1,"",?)', results.insertId, (error, results, fields) => {
                if(error){
                    return connection.rollback(() => {
                        throw error;
                    });
                }
                connection.commit(err => {
                    if(err) {
                        return connection.rollback(() => {
                            throw err;
                        });
                    }
                    console.log("Insert success!");
                });
            });


        });
    });

});


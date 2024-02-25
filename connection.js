const mysql = require('mysql');

async function createConnectionDB() {
    //async function createConnectionDB(user, password){ 
    return new Promise(function (resolve, reject) {

        var connection = mysql.createConnection({ //se crea la conexion
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting to MySQL ', err);
                reject(err);
            } else {
                console.log('¡¡¡Connected to MySQL!!!');
                resolve(connection); //se coloca aquí porque queremos que se resuelva la promesa cuando se conecte
            }
        });
    });
};

async function endConnectionDB(connection) {
    console.log('¡¡¡Ending connection!!!');
    connection.end();
}

async function main() {
    let connection = await createConnectionDB();
    return connection;
}

module.exports = main();
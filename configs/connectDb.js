const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chovybe_bakery',
    namedPlaceholders: true
});

module.exports = connection;
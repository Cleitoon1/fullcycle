const mysql = require('mysql')

const getConnection = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME
    });
}

const createDatabase = () => {
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
    });
    con.connect(function(err) {
        if (err)
            throw err;
        con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        con.commit();
    });
    con.destroy();
}

const createTables = () => {
    var conn = getConnection();
    const createPeopleTable = `
        create table if not exists People(
            id int primary key AUTO_INCREMENT, 
            name varchar(255)
        );`;
        conn.query(createPeopleTable)
        conn.commit()
}

const migrate = () => {
    createDatabase();
    createTables();
}

exports.migrate = migrate;
exports.connect = getConnection;


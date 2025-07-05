const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});
module.exports = db;
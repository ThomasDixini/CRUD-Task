import express from 'express';
import mysql from 'mysql'

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '147258369',
    database: 'my_db'
})

connection.connect();

app.post('/', (req, res) => {
    connection.query({
        sql: `INSERT INTO task(id, name) VALUES(1,'Thomás')`
    })

    return res.end("Congratulations");
})

app.listen(3333, () => {
    return console.log("Hello world!")
})
import express from 'express';
import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'
import { Console } from 'console';

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'my_db'
})

export class Database {
    insert(task) {
        connection.then(conn => {
            conn.connect()
            const sql = 'INSERT INTO task(id, title, description, created_at, updated_at) VALUES(?, ?, ?, ?, ?);'
            const values = [task.id, task.title, task.description, task.created_at, task.updated_at]
            conn.query(sql, values)
            return
        });
    }
}
console.log(new Date())


app.post('/tasks', async (req, res) => {

    const { title, description } = req.body;

    const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
    }

    const db = new Database

    await db.insert(task)

    return res.writeHead(201).end("Task created successfully");
})

app.listen(3333, () => {
    return console.log("Hello world!")
})

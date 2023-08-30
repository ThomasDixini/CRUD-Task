import express from 'express';
import mysql from 'mysql'
import { randomUUID } from 'crypto'

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '147258369',
    database: 'my_db'
})

connection.connect();

app.post('/tasks', (req, res) => {

    const { title, description } = req.body;

    const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date().getHours() + ":" + new Date().getMinutes(),
        updated_at: new Date().getHours() + ":" + new Date().getMinutes(),
    }
    
    connection.query({
        sql: `
        INSERT INTO task(id, title, description, created_at, updated_at)
        VALUES (${task.id}, ${title}, ${description}, ${task.created_at}, ${task.updated_at})
        `
    })

    return res.writeHead(201).end("Task created successfully");
})

app.listen(3333, () => {
    return console.log("Hello world!")
})
import express from 'express';

const app = express();

app.listen(3333, () => {
    return console.log("Hello world!")
})
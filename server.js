import express from 'express';
import {produceMessages} from "./sqs/producer.js";


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello! To create a message navigate to localhost:3000/create. By default this will create 1 message. Add a parameter to the request to create more. example "/2". The max supported value is 5000')
});

app.get('/create/:count', async (req, res) => {
    console.time();
    console.log("req.params.count:", req.params.count);
    let messagesCount = req.params.count ? Number(req.params.count) : 1;
    if (messagesCount > 5000) {
        messagesCount = 5000;
    };

    console.log("messagesCount:", messagesCount);

    const response = await produceMessages(messagesCount);
    res.send(response);
});

app.get('/create', async (req, res) => {
    console.time();
    const messagesCount = 1;

    console.log("start:");

    const response = await produceMessages(messagesCount);

    console.log("end:");

    res.send(response);
});

app.get("/getMessages", (req, res) => {
    const response = "implement to get all messages from mySql";
    res.send(response);
});

app.get("/getMessageById/:id", (req, res) => {
    const response = "implement to get message from mySql";
    res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
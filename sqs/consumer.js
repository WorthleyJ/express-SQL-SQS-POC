//consumer.js

import { Consumer } from 'sqs-consumer';
import {sqs} from './sqs';

const queueUrl = "https://sqs.us-east-2.amazonaws.com/877964022985/myQueuePOC.fifo";
// const queueUrl = process.env.QUEUE_URL

// Create our consumer
const app = Consumer.create({
    queueUrl: queueUrl,
    
    // Message handler function
    handleMessageBatch: async (message) => {
        console.log('Received a message')
        console.log(message)
        sqs.receiveMessage(message);
    },
    // Batch size of messages to process
    batchSize:10,
    
    sqs: sqs
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

console.log('Consumer service is running');
app.start()
import {sqs} from "./sqs.js";
const QueueUrl = "https://sqs.us-east-2.amazonaws.com/877964022985/myQueuePOC.fifo";
// const QueueUrl = process.env.QUEUE_URL;

const produceMessages = async (messagesCount) => {
    const createdIds = [];

    for (let i = 1; i < messagesCount + 1; i++) {
        const date = new Date().toISOString();
        const order_id = new Date().valueOf();
        const message = JSON.stringify({
            order_id,
            date,
            info: `This message is for index: ${order_id}}`
        });
        const messageNumString = order_id.toString();
        const params = {
        MessageBody: message,
        MessageGroupId: messageNumString,
        MessageDeduplicationId: messageNumString,
        QueueUrl: QueueUrl
        };
        
        //send message to the queue
        sqs.sendMessage(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                createdIds.push(data.MessageId)
                console.log("Success", data.MessageId);
            }

            if(messagesCount === createdIds.length) {
                console.log("createdIds length:", createdIds.length);
                // console.timeLog();
            }
        });
    }

    return `${messagesCount} messages have been created`;
}



export {produceMessages};
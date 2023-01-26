import AWS from "aws-sdk";

const credentials = new AWS.SharedIniFileCredentials({profile: "default"});
AWS.config.credentials = credentials;

const sqs = new AWS.SQS({ apiVersion: "2012-11-05",region:'us-east-2'});

export {sqs};
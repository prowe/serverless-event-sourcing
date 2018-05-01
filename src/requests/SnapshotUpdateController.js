
const AWS = require('aws-sdk');
const eventReducer = require('./events/eventReducer');

const documentClient = new AWS.DynamoDB.DocumentClient();

function extractRequestIdFromDynamoEvent(event) {
    return event.dynamodb.Keys.requestId.S;
}

async function getAllEventsForRequest(requestId) {
    const result = await documentClient.query({
        TableName: process.env.REQUEST_EVENTS_TABLE_NAME,
        KeyConditionExpression: "requestId = :requestId",
        ExpressionAttributeValues: {
            ':requestId': requestId
        }
    }).promise();

    return result.Items;
}

async function saveSnapshot(requestSnapshot) {
    await documentClient.put({
        TableName: REQUEST_SNAPSHOTS_TABLE_NAME,
        Item: requestSnapshot
    }).promise();
}

async function handleRecord(record) {
    const requestId = extractRequestIdFromDynamoEvent(record);
    const events = await getAllEventsForRequest(requestId);

    const requestSnapshot = events.reduce(eventReducer, null);
    await saveSnapshot(requestSnapshot);
}

module.exports.handler = async function(event) {
    console.log('got event', JSON.stringify(event));
    await Promise.all(event.Records.map(handleRecord));
};
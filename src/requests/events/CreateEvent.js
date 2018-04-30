
const AWS = require('aws-sdk');
const schema = require('./CreateEventSchema');
const documentClient = new AWS.DynamoDB.DocumentClient();

function handleError(error) {
    if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.details)
        };
    }
}

async function handleValidEvent(value, requestId) {
    const event = {
        ...value,
        requestId,
        eventTimestamp: (new Date(Date.now())).toISOString(),
        eventType: 'Create'
    };

    await documentClient.put({
        TableName: process.env.CASE_EVENTS_TABLE_NAME,
        Item: event
    }).promise();

    return {
        statusCode: 202,
        body: JSON.stringify(event)
    };
}

module.exports.handler = async function(request) {
    console.log('handling', request);
    const body = JSON.parse(request.body);

    const {error, value} = schema.validate(body);
    return handleError(error) || await handleValidEvent(value, request.pathParameters.requestId);    
};
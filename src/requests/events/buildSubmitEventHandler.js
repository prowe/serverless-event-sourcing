
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const headers = {
    'Access-Control-Allow-Origin': '*'
};

module.exports = function buildSubmitEventHandler(eventType, schema) {
    function handleError(error) {
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.details),
                headers
            };
        }
    }

    async function handleValidEvent(value, requestId) {
        const event = {
            ...value,
            requestId,
            eventTimestamp: (new Date(Date.now())).toISOString(),
            eventType
        };
    
        await documentClient.put({
            TableName: process.env.REQUEST_EVENTS_TABLE_NAME,
            Item: event
        }).promise();
    
        return {
            statusCode: 202,
            body: JSON.stringify(event),
            headers
        };
    }
    
    return async function(request) {
        console.log('handling', request);
        const body = JSON.parse(request.body);
    
        const {error, value} = schema.validate(body);
        return handleError(error) || await handleValidEvent(value, request.pathParameters.requestId);    
    };
};


const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async function listRequests(request) {
    const result = await documentClient.scan({
        TableName: process.env.REQUEST_SNAPSHOTS_TABLE_NAME
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
};
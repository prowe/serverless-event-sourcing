
const Joi = require('joi');
const buildSubmitEventHandler = require('./buildSubmitEventHandler');

const eventType = 'Review'

const schema = Joi.object()
    .options({
        abortEarly: false
    })
    .keys({
        determination: Joi.string()
            .required()
            .valid('Approved', 'Denied'),
        rationale: Joi.string()
    });

const submitEvent = buildSubmitEventHandler(eventType, schema);

function applyToRequest(event, request) {
    return {
        ...request,
        version: request.version + 1,
        reviewDate: event.eventTimestamp,
        status: event.determination,
        rationale: event.rationale
    };
}

module.exports = {
    eventType,
    submitEvent,
    applyToRequest
};
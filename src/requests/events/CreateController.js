
const Joi = require('joi');
const buildSubmitEventHandler = require('./buildSubmitEventHandler');

const eventType = 'Create';

const schema = Joi.object()
    .options({
        abortEarly: false
    })
    .keys({
        request: Joi.string()
            .required(),
        justification: Joi.string()
            .required()
    });

const submitEvent = buildSubmitEventHandler(eventType, schema);

function applyToRequest(event) {
    return {
        version: 1,
        submitDate: event.eventTimestamp,
        request: event.request,
        justification: event.justification,
        status: 'Pending'
    };
}

module.exports = {
    eventType,
    submitEvent,
    applyToRequest
};
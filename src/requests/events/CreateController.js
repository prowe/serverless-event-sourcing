
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

module.exports = {
    eventType,
    submitEvent
};
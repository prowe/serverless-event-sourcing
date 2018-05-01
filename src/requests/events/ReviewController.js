
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

module.exports = {
    eventType,
    submitEvent
};
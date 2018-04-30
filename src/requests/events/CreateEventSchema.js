
const Joi = require('joi');

module.exports = Joi.object()
    .options({
        abortEarly: false
    })
    .keys({
        request: Joi.string()
            .required(),
        justification: Joi.string()
            .required()
    });
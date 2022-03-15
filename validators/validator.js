const Joi = require('joi');

const constants = require('../constants/constants');

exports.createEvent = createEvent;

function createEvent(req, res, next) {
    let schema = Joi.object({
        name: Joi.string().max(256).required(),
        start_time: Joi.date().required(),
        duration: Joi.number().min(0).required(),
    })

    let validation = schema.validate(req.body);
    if (validation.error) {
        let errorReason =
            validation.error.details != undefined
                ? validation.error.details[0].message.replace(/[*][?][a-z]|[A-Z]|[0-9]\"/g, validation.error.details[0].path[0])
                : constants.RESPONSE_MESSAGES.PARAMETER_MISSING;
        logger.info("Validation Error");
        return constants.sendResponse(res, errorReason, constants.RESPONSE_FLAGS.PARAMETER_MISSING);
    }
    next();
};

const Joi = require('joi');

exports.create = async (newParticipants) => {

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
        title: Joi.string().required().messages({
            'string.empty': "title cannot be null",
            'any.required': "title cannot be null",
        })
    }).required();

    try {
        const response = await schema.validateAsync(newParticipants);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.updateByActivityGroupId = async (newParticipants) => {

    const schema = Joi.object({
        activity_group_id: Joi.number().required(),
    }).required();

    try {
        const response = await schema.validateAsync(newParticipants);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.readById = async (newParticipants) => {

    const schema = Joi.object({
        id: Joi.number().required()
    }).required();

    try {
        const response = await schema.validateAsync(newParticipants);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.updateById = async (newParticipants) => {

    const schema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().required().messages({
            'string.empty': "title cannot be null",
            'any.required': "title cannot be null",
        })
    }).required();

    try {
        const response = await schema.validateAsync(newParticipants);
        return response;
    } catch (error) {
        throw error;
    }
};
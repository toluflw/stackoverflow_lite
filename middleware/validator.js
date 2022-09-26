const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$@#&!]{6,12}$'))
        .required(),
});

const qschema = Joi.object({
    userId: Joi.number()
        .required()
        .integer(),
        
    title: Joi.string()
        .min(15)
        .max(140)
        .required(),

    body: Joi.string()
        .min(30)
        .max(1000)
        .required(),
});

const aschema = Joi.object({
    userId: Joi.number()
        .required()
        .integer(),

    questionId: Joi.number()
        .required()
        .integer(),

    body: Joi.string()
        .min(20)
        .max(1000)
        .required(),
});

module.exports = {
    schema,
    qschema,
    aschema,
};
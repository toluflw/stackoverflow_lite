const { controllerResponseHandler } = require('../middleware');

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
    body: Joi.string()
        .min(20)
        .max(1000)
        .required(),
});

const cschema = Joi.object({
    body: Joi.string()
        .min(20)
        .max(1000)
        .required(),
});

const vschema = Joi.object({
    vote_type: Joi.string()
        .valid('up', 'down')
        .required(),
});


const createUserValidator = async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body)
        req.body = value;
        next();
    } catch (error) {
        console.log(error.message);
        controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createQuestionValidator = async(req, res, next) => {
    try {
            const value = await qschema.validateAsync(req.body)
            req.body = value;
            next();
    } catch (error) {
        console.log(error.message);
        controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createVoteValidator = async(req, res, next) => {
    try {
        const value = await vschema.validateAsync(req.body)
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createAnswerValidator = async(req, res, next) => {
    try {
        const value = await aschema.validateAsync(req.body)
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createCommentValidator = async(req, res, next) => {
    try {
        const value = await cschema.validateAsync(req.body)
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

module.exports = {
    createUserValidator,
    createQuestionValidator,
    createVoteValidator,
    createAnswerValidator,
    createCommentValidator,
};
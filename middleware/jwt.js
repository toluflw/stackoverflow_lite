const { responseHandler } = require('./handlers');
const jwt = require('jsonwebtoken');

const getJwtToken = (payload, logMessage, result) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (error, token) => {
        if (error) {
          console.log('error: ', error);
          return result(responseHandler(false, error.statusCode, error.message, null), null);
        }
  
        return result(null, responseHandler(true, 200, logMessage, { token }));
      },
    );
  };

  module.exports = getJwtToken;
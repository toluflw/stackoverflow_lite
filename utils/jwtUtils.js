const { errorHandler, responseHandler, controllerResponseHandler } = require('../middleware');
const jwt = require('jsonwebtoken');

// const getJwtToken = (payload, logMessage, result) => {
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN },
//       (error, token) => {
//         if (error) {
//           console.log('error: ', error);
//           return errorHandler(false, error.statusCode, error.message, null);
//         }
//         return result(null, responseHandler(true, 200, logMessage, { token }));
//       }
//     );
//   };

const getJwtToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};

  module.exports = getJwtToken;
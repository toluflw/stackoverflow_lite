require('dotenv').config();
const { responseHandler } = require('./handlers');
const JWT = require('jsonwebtoken');


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json(responseHandler(false, 401, 'sign-in required', null));
  }
  

  // Verify token
  try {
    JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(400)
          .json(responseHandler(false, 400, 'try again', null));
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error(`error: ${err}`);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
};

module.exports = auth;
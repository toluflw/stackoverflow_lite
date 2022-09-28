require('dotenv').config();
const bcrypt = require('bcrypt');
const { responseHandler, errorHandler } = require('../middleware');
const utils = require('../utils')

const { User } = require('../models');

/**
 * @class Users Services (logic)
 */

class UsersService{
  static register = async (newUser) => {
    const salt = await bcrypt.genSalt(10);
  
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const insertObj = await User
    .create(
      {
          username: newUser.username,
          password: newUser.password,
      }
      )

    const jwtPayload = {
      user: {
        id: insertObj.dataValues.id,
      },
    };

    utils.getJwtToken(jwtPayload, 'user registered');

    const payload = {
      user: {
        username: insertObj.dataValues.username,
        created_at: insertObj.dataValues.createdAt,
      },
    };

    return payload;
  };

  static login = async (newUser, result) => {
      const user = await User
      .findOne({
        where: {username:  newUser.username},
      })
      
      if (!user) {
        result(responseHandler(false, 404, 'user does not exist', null), null);
      }
    
      const isMatch = await bcrypt.compare(newUser.password, user.password);
    
      if (!isMatch) {
        result(responseHandler(false, 400, 'incorrect password', null), null);
      }
    
      const jwtPayload = {
        user: {
          id: user.id,
        },
      };

      utils.getJwtToken(jwtPayload, 'user logged in', result);
      
      const payload = {
        user: {
          username: user.username,
        },
      };
    
      return payload;
    };

 static loadUser = async (userId, result) => {
    const response = await User.findOne({ where: { id: userId} }, result);
    result(null, responseHandler(true, 200, 'Success', `logged in as: ${response.username}`));
  };

}

module.exports = UsersService;
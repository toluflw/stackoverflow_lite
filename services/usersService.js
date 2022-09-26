require('dotenv').config();
const bcrypt = require('bcrypt');
const { getJwtToken, responseHandler, schema } = require('../middleware');

const { User } = require('../models');

/**
 * @class Users Services (logic)
 */

class UsersService{
  static register = async (newUser, result) => {
    const salt = await bcrypt.genSalt(10);

  
    const value = await schema.validateAsync(newUser)
      .catch((error) => {
      console.log(error.message);
      return result(responseHandler(false, error.statusCode, error.message, null), null);
  });
    
    
    value.password = await bcrypt.hash(value.password, salt);
    const insertObj = await User
    .create(
      {
          username: value.username,
          password: value.password,
      }
      )
      .catch((error) => {
          console.log(error.message);
          return result(responseHandler(false, error.statusCode, error.message, null), null);
        });

    const payload = {
      user: {
        id: insertObj.dataValues.id,
      },
    };

    getJwtToken(payload, 'user registered', result);

    return payload;
  };

  static login = async (newUser, result) => {
      const user = await User
      .findOne({
        where: {username:  newUser.username},
      })
      
      if (user === null) {
        result(
          responseHandler(
            false,
            404,
            'user does not exist',
            null,
          ),
          null,
        );
        return null;
      }
    
      const isMatch = await bcrypt.compare(newUser.password, user.password);
    
      if (!isMatch) {
        result(
          responseHandler(false, 400, 'incorrect password', null),
          null,
        );
    
        return null;
      }
    
      const payload = {
        user: {
          id: user.id,
        },
      };
    
      getJwtToken(payload, 'user logged in', result);
    
      return payload;
    };

 static loadUser = async (userId, result) => {
    const response = await User.findOne({ where: { id: userId} }, result);
    result(null, responseHandler(true, 200, 'Success', `logged in as: ${response.username}`));
  };

}

module.exports = UsersService;
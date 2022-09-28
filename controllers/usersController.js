const { usersService } = require('../services');
const { controllerResponseHandler, asyncHandler } = require('../middleware');


/**
 * @class User Activities Controller
 */

class UsersController{       
  static register = asyncHandler(async (req, res) => {
    try {
      // Register user in the database
        const data = await usersService.register(req.body)
        return controllerResponseHandler(res,true, 201, 'user succesfully registered', data);
    } catch (err) {
      console.log(err);
      return controllerResponseHandler(res,false, err.statusCode, err.message, null);
    }
  });

}

module.exports = UsersController;
const { usersService } = require('../services');
const { responseHandler, asyncHandler } = require('../middleware');


/**
 * @class User Activities Controller
 */

class UsersController{

  static User = (user) => ({
      username: user.username,
      password: user.password,
      });
        
  static register = asyncHandler(async (req, res) => {
    try {
      // Register user in the database
      await usersService.register(this.User(req.body), (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(responseHandler(true, 500, err.message, null));
    }
  });

}

module.exports = UsersController;
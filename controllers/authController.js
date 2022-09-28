
const { responseHandler, asyncHandler } = require('../middleware');
const { usersService } = require('../services');


/**
 * @class Authentication and Authorization Controller
 */

class AuthController{

  static User = (user) => ({
    username: user.username,
    password: user.password,
  });

  static loadUser = asyncHandler(async (req, res) => {
    try {
      await usersService.loadUser(req.user.id, (err, data) => {
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
        .json(responseHandler(false, 500, 'server error', null));
    }
  });

  static login = asyncHandler(async (req, res) => {
    try {
      // Login the user
      await usersService.login(this.User(req.body), (err, data) => {
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
        .json(responseHandler(true, 500, 'server error', null));
    }
  });

}

module.exports = AuthController;
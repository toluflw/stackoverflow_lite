const express = require('express');
const { auth } = require('../middleware');
const { authController } = require('../controllers');

const router = express.Router();

/** @route      GET /api/v1/auth
 *  @desc       fetch logged-in user details
 */
router.route('/')
  .get(auth, authController.loadUser);

/** @route      POST /api/v1/auth
 *  @desc       log in user
 */
router.route('/')
  .post(authController.login);

module.exports = router;
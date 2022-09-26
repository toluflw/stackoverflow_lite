const express = require('express');
const { usersController } = require('../controllers');
const { checkExistence } = require('../middleware');

const router = express.Router();

/** @route      POST /api/v1/users/
 *  @desc       register a new user
 */
router.route('/')
  .post(checkExistence, usersController.register);

module.exports = router;
const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRouter'));
router.use('/users', require('./usersRouter'));
router.use('/posts', require('./questionsRouter'));
router.use('/posts/answers', require('./answersRouter'));


module.exports = router;


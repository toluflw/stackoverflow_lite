const express = require('express');

const router = express.Router();

router.use('/users', require('./usersRouter'));
router.use('/posts', require('./questionsRouter'));
router.use('/posts/answers', require('./answersRouter'));
router.use('/posts/answers/votes', require('./votesRouter'));
router.use('/posts/answers/comments', require('./commentsRouter'));


module.exports = router;


const GetPostsController = require('../app/useCases/getPostsController');

const router = require('express').Router();

const getPostsController = new GetPostsController();

router.get('/', getPostsController.handler.bind(getPostsController));

module.exports = router
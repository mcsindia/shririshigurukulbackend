const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// User routes
router.get('/getAllUserList', require('./users/getAllUserList'));
router.post('/insertNewGurukulUser', require('./users/insertNewGurukulUser'));
router.post('/updateUser', require('./users/updateUser'));

//news
router.get('/getAllNewsList', require('./news/getAllNewsList'));
router.post('/insertNewsData', upload.single('image'), require('./news/insertNewsData'));
router.post('/updateNewsDetails', upload.single('image'), require('./news/updateNewsDetails'));
router.post('/deleteNews', require('./news/deleteNews'));


module.exports = router;

const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// User routes
router.get('/getAllUserList', require('./users/getAllUserList'));
router.post('/insertNewGurukulUser', require('./users/insertNewGurukulUser'));
router.post('/updateUser', require('./users/updateUser'));

//news
router.get('/getAllNewsList', require('./news/getAllNewsList'));

router.post('/insertNewsData', (req, res, next) => {
  req.uploadType = 'news';
  next();
}, upload.single('image'), require('./news/insertNewsData'));

router.put('/updateNewsDetails/:id', (req, res, next) => {
  req.uploadType = 'news';
  next();
}, upload.single('image'), require('./news/updateNewsDetails'));

router.delete('/deleteNews/:id', require('./news/deleteNews'));

//events
router.get('/getAllEventList', require('./events/getAllEventList'));
router.post('/insertEventsData', (req, res, next) => {
  req.uploadType = 'events';
  next();
}, upload.single('image'), require('./events/insertEventsData'));

router.put('/updateEventsDetails/:id', (req, res, next) => {
  req.uploadType = 'events';
  next();
}, upload.single('image'), require('./events/updateEventsDetails'));

router.delete('/deleteEvents/:id', require('./events/deleteEvents'));

//blogs
router.post('/insertBlogData', (req, res, next) => {
  req.uploadType = 'blogs';
  next();
}, upload.single('image'), require('./blogs/insertBlogData'));

router.get('/getAllBlogsList', require('./blogs/getAllBlogsList'));

router.put('/updateBlogDetails/:id', (req, res, next) => {
  req.uploadType = 'blogs';
  next();
}, upload.single('image'), require('./blogs/updateBlogDetails'));

router.delete('/deleteBlogs/:id', require('./blogs/deleteBlogs'));

//hero_banners
router.post('/insertHeroBannerData', (req, res, next) => {
  req.uploadType = 'hero_banners';
  next();
}, upload.single('image'), require('./hero_banners/insertHeroBannerData'));

router.get('/getAllHeroBannerList', require('./hero_banners/getAllHeroBannerList'));

router.put('/updateHeroBannerDetails/:id', (req, res, next) => {
  req.uploadType = 'hero_banners';
  next();
}, upload.single('image'), require('./hero_banners/updateHeroBannerDetails'));

router.delete('/deleteHeroBanner/:id', require('./hero_banners/deleteHeroBanner'));

module.exports = router;

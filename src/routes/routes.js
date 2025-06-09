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

//gallery
//images
router.post('/insertGalleryCollectionImage', (req, res, next) => {
  req.uploadType = 'Gallery/images';
  next();
}, upload.single('image'), require('./Gallery/images/insertGalleryCollectionImage'));

router.get('/getGalleryCollectionImagesList', require('./Gallery/images/getGalleryCollectionImagesList'));
router.put('/updateGalleryCollectionImage/:id', (req, res, next) => {
  req.uploadType = 'Gallery/images';
  next();
}, upload.single('image'), require('./Gallery/images/updateGalleryCollectionImage'));

router.delete('/deleteGalleryCollectionImage/:id', require('./Gallery/images/deleteGalleryCollectionImage'));

//subImages
router.post('/insertGalleryItemsImage', (req, res, next) => {
  req.uploadType = 'Gallery/images/subImage';
  next();
}, upload.array('image'), require('./Gallery/images/insertGalleryItemsImage'));

router.get('/getGalleryItemsImage', require('./Gallery/images/getGalleryItemsImage'));
router.put('/updateGalleryItemsImage/:id', (req, res, next) => {
  req.uploadType = 'Gallery/images/subImage';
  next();
}, upload.single('image'), require('./Gallery/images/updateGalleryItemsImage'));

router.delete('/deleteGalleryItemsImage/:id', require('./Gallery/images/deleteGalleryItemsImage'));

//Gallery->videos
router.post('/insertGalleryVideoCollection', (req, res, next) => {
  req.uploadType = 'Gallery/videos';
  next();
}, upload.single('image'), require('./Gallery/videos/insertGalleryVideoCollection'));

router.get('/getGalleryCollectionVideoList', require('./Gallery/videos/getGalleryCollectionVideoList'));

router.put('/updateGalleryCollectionVideo/:id', (req, res, next) => {
  req.uploadType = 'Gallery/videos';
  next();
}, upload.single('image'), require('./Gallery/videos/updateGalleryCollectionVideo'));

router.delete('/deleteGalleryCollectionVideo/:id', require('./Gallery/videos/deleteGalleryCollectionVideo'));

//gallery->videos-.subvideo
router.post('/insertGalleyItemVideo', require('./Gallery/videos/insertGalleyItemVideo'));
router.get('/getGalleryitemVideoList', require('./Gallery/videos/getGalleryitemVideoList'));
router.put('/updateGalleryItemVideo/:id', require('./Gallery/videos/updateGalleryItemVideo'));
router.delete('/deleteGalleryItemVideo/:id', require('./Gallery/videos/deleteGalleryItemVideo'));

//contact
router.post('/insertContactUsDetails', require('./contact/insertContactUsDetails'));
router.get('/getListOfContactQueries', require('./contact/getListOfContactQueries'));
router.put('/updateContactQueryStatus/:id', require('./contact/updateContactQueryStatus'));

module.exports = router;

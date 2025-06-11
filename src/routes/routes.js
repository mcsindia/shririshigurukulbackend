const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

// User routes
router.get('/getAllUserList',authMiddleware, require('./users/getAllUserList'));
router.post('/insertNewGurukulUser',authMiddleware, require('./users/insertNewGurukulUser'));
router.post('/updateUser',authMiddleware, require('./users/updateUser'));
router.post('/login', require('./users/login'));

//news
router.get('/getAllNewsList', authMiddleware,require('./news/getAllNewsList'));

router.post('/insertNewsData', (req, res, next) => {
  req.uploadType = 'news';
  next();
}, upload.single('image'), authMiddleware, require('./news/insertNewsData'));

router.put('/updateNewsDetails/:id', (req, res, next) => {
  req.uploadType = 'news';
  next();
}, upload.single('image'), authMiddleware, require('./news/updateNewsDetails'));

router.delete('/deleteNews/:id', authMiddleware, require('./news/deleteNews'));

//events
router.get('/getAllEventList', authMiddleware, require('./events/getAllEventList'));
router.post('/insertEventsData', (req, res, next) => {
  req.uploadType = 'events';
  next();
}, upload.single('image'), authMiddleware, require('./events/insertEventsData'));

router.put('/updateEventsDetails/:id', (req, res, next) => {
  req.uploadType = 'events';
  next();
}, upload.single('image'), authMiddleware, require('./events/updateEventsDetails'));

router.delete('/deleteEvents/:id', authMiddleware, require('./events/deleteEvents'));

//blogs
router.post('/insertBlogData', (req, res, next) => {
  req.uploadType = 'blogs';
  next();
}, upload.single('image'), authMiddleware, require('./blogs/insertBlogData'));

router.get('/getAllBlogsList', authMiddleware, require('./blogs/getAllBlogsList'));

router.put('/updateBlogDetails/:id', (req, res, next) => {
  req.uploadType = 'blogs';
  next();
}, upload.single('image'), authMiddleware, require('./blogs/updateBlogDetails'));

router.delete('/deleteBlogs/:id', authMiddleware, require('./blogs/deleteBlogs'));

//hero_banners
router.post('/insertHeroBannerData', (req, res, next) => {
  req.uploadType = 'hero_banners';
  next();
}, upload.single('image'), authMiddleware, require('./hero_banners/insertHeroBannerData'));

router.get('/getAllHeroBannerList', authMiddleware, require('./hero_banners/getAllHeroBannerList'));

router.put('/updateHeroBannerDetails/:id', (req, res, next) => {
  req.uploadType = 'hero_banners';
  next();
}, upload.single('image'), authMiddleware, require('./hero_banners/updateHeroBannerDetails'));

router.delete('/deleteHeroBanner/:id', authMiddleware, require('./hero_banners/deleteHeroBanner'));

//gallery
//images
router.post('/insertGalleryCollectionImage', (req, res, next) => {
  req.uploadType = 'Gallery/images';
  next();
}, upload.single('image'), authMiddleware, require('./Gallery/images/insertGalleryCollectionImage'));

router.get('/getGalleryCollectionImagesList', authMiddleware, require('./Gallery/images/getGalleryCollectionImagesList'));
router.put('/updateGalleryCollectionImage/:id', (req, res, next) => {
  req.uploadType = 'Gallery/images';
  next();
}, upload.single('image'), authMiddleware, require('./Gallery/images/updateGalleryCollectionImage'));

router.delete('/deleteGalleryCollectionImage/:id', authMiddleware, require('./Gallery/images/deleteGalleryCollectionImage'));

//subImages
router.post('/insertGalleryItemsImage', (req, res, next) => {
  req.uploadType = 'Gallery/images/subImage';
  next();
}, upload.array('image'), authMiddleware, require('./Gallery/images/insertGalleryItemsImage'));

router.get('/getGalleryItemsImage', authMiddleware, require('./Gallery/images/getGalleryItemsImage'));
router.put('/updateGalleryItemsImage/:id', (req, res, next) => {
  req.uploadType = 'Gallery/images/subImage';
  next();
}, upload.single('image'), authMiddleware, require('./Gallery/images/updateGalleryItemsImage'));

router.delete('/deleteGalleryItemsImage/:id', authMiddleware, require('./Gallery/images/deleteGalleryItemsImage'));

//Gallery->videos
router.post('/insertGalleryVideoCollection', (req, res, next) => {
  req.uploadType = 'Gallery/videos';
  next();
}, upload.single('image'), authMiddleware, require('./Gallery/videos/insertGalleryVideoCollection'));

router.get('/getGalleryCollectionVideoList', authMiddleware, require('./Gallery/videos/getGalleryCollectionVideoList'));

router.put('/updateGalleryCollectionVideo/:id', (req, res, next) => {
  req.uploadType = 'Gallery/videos';
  next();
}, upload.single('image'), authMiddleware, require('./Gallery/videos/updateGalleryCollectionVideo'));

router.delete('/deleteGalleryCollectionVideo/:id', authMiddleware, require('./Gallery/videos/deleteGalleryCollectionVideo'));

//gallery->videos-.subvideo
router.post('/insertGalleyItemVideo', authMiddleware, require('./Gallery/videos/insertGalleyItemVideo'));
router.get('/getGalleryitemVideoList', authMiddleware, require('./Gallery/videos/getGalleryitemVideoList'));
router.put('/updateGalleryItemVideo/:id', authMiddleware, require('./Gallery/videos/updateGalleryItemVideo'));
router.delete('/deleteGalleryItemVideo/:id', authMiddleware, require('./Gallery/videos/deleteGalleryItemVideo'));

//contact
router.post('/insertContactUsDetails', authMiddleware, require('./contact/insertContactUsDetails'));
router.get('/getListOfContactQueries', authMiddleware, require('./contact/getListOfContactQueries'));
router.put('/updateContactQueryStatus/:id', authMiddleware, require('./contact/updateContactQueryStatus'));

module.exports = router;

const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const albumController = require('../controllers/albumController');
const profileController = require('../controllers/profileController');

router.put('/likes', likeController.handleUpdateLike);
router.put('/albums', albumController.handleUpdateAlbum);
router.put('/profile', profileController.handleUpdateProfilePhoto);

module.exports = router;
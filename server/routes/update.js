const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const albumController = require('../controllers/albumController');

router.put('/likes', likeController.handleUpdateLike);
router.put('/albums', albumController.handleUpdateAlbum);

module.exports = router;
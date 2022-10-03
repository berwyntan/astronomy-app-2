const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

router.get('/login/google', passport.authenticate('google'));

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ 
            message: "login successful",
            user: req.user,
            // cookies: req.cookies,
            // jwt: jwt
        })
    }    
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({ message: "login failed"})
});

router.get("logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}))

module.exports = router
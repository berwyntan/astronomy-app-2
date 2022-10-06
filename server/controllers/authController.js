const User = require('../model/User');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    // console.log(user);
    // console.log(pwd);
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    // console.log(foundUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const likedItemData = foundUser.likes;
        const albumData = foundUser.albums;
        res.json({ 
            message: `user ${user} successfully logged in`,
            likedItemData: likedItemData,
            albumData: albumData
         });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
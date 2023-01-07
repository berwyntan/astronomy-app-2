const User = require('../model/User');

const handleUpdateAlbum = async (req, res) => {
    const { user, albums } = req.body;
        
    const foundUser = await User.findOne({ username: user }).exec();
    
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    
    foundUser.albums = albums;
    const result = await foundUser.save();

    res.status(200).json({ message: `User ${user} albums updated`})
    
}

module.exports = { handleUpdateAlbum };
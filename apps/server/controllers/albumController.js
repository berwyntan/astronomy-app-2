const User = require('../model/User');

const handleUpdateAlbum = async (req, res) => {
    const { user, albums } = req.body;
    // console.log(user)
    // console.log(albums)
    
    const foundUser = await User.findOne({ username: user }).exec();
    // const id = foundUser._id;
    // console.log(id);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    
    foundUser.albums = albums;
    const result = await foundUser.save();

    // console.log(result);

    // User.findByIdAndUpdate(id, { likes: likes});

    res.status(200).json({ message: `User ${user} albums updated`})
    
}

module.exports = { handleUpdateAlbum };
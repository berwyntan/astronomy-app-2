const User = require('../model/User');

const handleUpdateProfilePhoto = async (req, res) => {
    const { user, profilePhoto } = req.body;
    // console.log(profilePhoto)
    // console.log(albums)
    
    const foundUser = await User.findOne({ username: user }).exec();
    // const id = foundUser._id;
    // console.log(id);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    
    foundUser.profilePhoto = profilePhoto;
    const result = await foundUser.save();

    // console.log(result);

    // User.findByIdAndUpdate(id, { likes: likes});

    res.status(200).json({ message: `User ${user} profile photo updated`})
    
}

module.exports = { handleUpdateProfilePhoto };
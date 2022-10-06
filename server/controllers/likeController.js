const User = require('../model/User');

const handleUpdateLike = async (req, res) => {
    const { user, likes } = req.body;
    console.log(user)
    console.log(likes)
    
    const foundUser = await User.findOne({ username: user }).exec();
    // const id = foundUser._id;
    // console.log(id);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    
    foundUser.likes = likes;
    const result = await foundUser.save();

    console.log(result);

    // User.findByIdAndUpdate(id, { likes: likes});

    res.status(200).json({ message: `User ${user} likes updated`})
    
}

module.exports = { handleUpdateLike };
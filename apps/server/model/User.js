const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,    
    password: String,
    profilePhoto: String,
    
    refreshToken: String,

    likes: String,
    albums: String

});

module.exports = mongoose.model('User', userSchema);
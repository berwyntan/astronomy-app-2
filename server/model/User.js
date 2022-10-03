const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    googleId: {
        type: String,
    },
    googleProfile: {
        type: String,
    },
    token: String
});

module.exports = mongoose.model('User', userSchema);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const cookieSession = require("cookie-session");
const session = require('express-session');
const sessionOptions = require('./session');
const passport = require('passport');
const User = require('./model/User');
require("./passport");

const app = express();
const PORT = process.env.PORT || 5000;




// connect to mongoDB
connectDB();

// middleware
app.use(cookieSession(
    {
        name: "session",
        keys: ["keyboardcat"],
        maxAge: 24 * 60 * 60 * 100
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));

app.use(session(sessionOptions));    

app.use(passport.initialize());
app.use(passport.session());

app.use('/random', require('./routes/random'));
app.use('/latest', require('./routes/latest'));
app.use('/auth', require('./routes/auth'));

// routes
app.get("/", (req, res) => {
    res.json({ message: "hello world" })
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongoDB
connectDB();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
    res.json({ message: "hello world" })
});

app.use('/random', require('./routes/random'));
app.use('/latest', require('./routes/latest'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
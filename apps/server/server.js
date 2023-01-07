require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;


// connect to mongoDB
connectDB();

// middleware
app.use(express.static("../client/dist"));
app.use(cors(corsOptions));
app.use(credentials);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


app.use(morgan('dev'));




app.use('/random', require('./routes/random'));
app.use('/latest', require('./routes/latest'));
app.use('/signup', require('./routes/signup'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// app.get("/*", (req, res) => {
//     res.sendFile(path.resolve("../client/dist/index.html"));
//   });

app.use(verifyJWT);
app.use('/update', require('./routes/update'));

// routes
app.get("/", (req, res) => {
    res.json({ message: "hello world" })
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
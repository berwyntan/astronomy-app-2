// const MongoStore = require("connect-mongo");

// const sessionStore = MongoStore.create({
//     mongoUrl: process.env.MONGODB_URL,
//     ttl: 24 * 60 * 60 * 100,
// })

// const sessionOptions = {
//     secret: 'keyboardcat',
//     cookie: { maxAge: 24 * 60 * 60 * 100, httpOnly: true, signed: true},
//     saveUninitialized: true,
//     resave: false,
//     store: sessionStore
// }

// module.exports = sessionOptions
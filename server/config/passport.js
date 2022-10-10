// const passport = require("passport");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../model/User');

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback",
    
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // console.log(profile)
//     User.findOne({ googleId: profile.id }).then((existingUser) => {
//       if (existingUser) {
//         // we already have a record with the given profile ID
//         console.log("existing user");
//         console.log(accessToken);
//         existingUser.accessToken = accessToken;
//         existingUser.save();
//         done(null, existingUser);
//       } else {
//         // we don't have a user record with this ID, make a new record!
//          new User({ 
//           googleId: profile.id,
//           displayName: profile.displayName,
//           profilePhoto: profile.photos[0].value,
//           accessToken: accessToken
//         }).save()
//           .then((user) => done(null, user));
//       }
//   });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user)
// });
// passport.deserializeUser((user, done) => {
//     done(null, user)
// });


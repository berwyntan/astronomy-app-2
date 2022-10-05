const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./model/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile)
    User.findOne({ googleId: profile.id }).then((existingUser) => {
      if (existingUser) {
        // we already have a record with the given profile ID
        console.log("existing user");
        console.log(accessToken);
        existingUser.accessToken = accessToken;
        existingUser.save();
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record!
         new User({ 
          googleId: profile.id,
          displayName: profile.displayName,
          profilePhoto: profile.photos[0].value,
          accessToken: accessToken
        }).save()
          .then((user) => done(null, user));
      }
  });
}));

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

// profile:
// {
//   id: '109155663087636853850',
//   displayName: 'Berwyn Tan',
//   name: { familyName: 'Tan', givenName: 'Berwyn' },      
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/ALm5wu1DdozBbzElUeVzdmCo0BzsrLpZNZ4s4RI3gviO=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "109155663087636853850",\n' +
//     '  "name": "Berwyn Tan",\n' +
//     '  "given_name": "Berwyn",\n' +
//     '  "family_name": "Tan",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/ALm5wu1DdozBbzElUeVzdmCo0BzsrLpZNZ4s4RI3gviO\\u003ds96-c",\n' +
//     '  "locale": "en"\n' +
//     '}',
//   _json: {
//     sub: '109155663087636853850',
//     name: 'Berwyn Tan',
//     given_name: 'Berwyn',
//     family_name: 'Tan',
//     picture: 'https://lh3.googleusercontent.com/a/ALm5wu1DdozBbzElUeVzdmCo0BzsrLpZNZ4s4RI3gviO=s96-c',
//     locale: 'en'
//   }
// 

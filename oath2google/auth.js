const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID='542681935690-6aflvu3u9ci33dhbhprkdvkebih24i65.apps.googleusercontent.com'

const GOOGLE_CLIENT_SECRET='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'
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   return done(null, profile)
  }
));

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null, user)
})
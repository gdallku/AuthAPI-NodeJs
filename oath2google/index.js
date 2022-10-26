const express= require('express');
const session = require('express-session')
const passport = require('passport')
require('./auth')
const app= express()

function isLoggedinIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}
app.use(session({secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session())

app.get('/',(req,res)=>{
    res.send('<a href="auth/google"> Authenticate with Google</a>')
})

app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}))

app.get('/google/callback',passport.authenticate('google',{successRedirect:'/protected',failureRedirect:'auth/google'}))






app.get('/auth/failure', (req,res) =>{
    res.send('something went wrong...')
})

app.get('/protected',isLoggedinIn,(req,res)=>{
    console.log('req',req.user)
console.log('hello')
})
app.get('/logout', (req, res) => {
    req.logout(req.user, (err)=>{
        res.send('Logout succesfully!!')
    })
})


app.listen(4000 ,() => console.log('server in running on PORT:4000'))
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
require('dotenv').config()

const posts = [
  {
    username: "Gezim",
    title: "Post1",
  },
  {
    username: "username",
    title: "Post2",
  },
];

//HTTP Get Posts

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter(post =>post.username === req.username));
});

// HTTP Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username,};

  const accesToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
  res.json({accesToken:accesToken})


});
//AuthentiacionToken
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    // split token
    const token = authHeader && authHeader.split('')[1]
    console.log('token split',token)
    //check token
    if(token == null) return res.sendStatus(401)

    //verify token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if(err) return req.sendStatus(403);
        req.user=user 
        next();
    })
    //

}



app.listen(3000);

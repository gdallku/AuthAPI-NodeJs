const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
require("dotenv").config();

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accesToken = generateAccessToken({ name: user.name });
    res.json({ accesToken: accesToken });
  });
});

// HTTP Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accesToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accesToken: accesToken, refreshToken: refreshToken });
});
/*
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
*/

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

app.listen(4000);

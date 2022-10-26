const express = require('express');
const bcrypt = require('bcrypt');
const app= express();


app.use(express.json())
const users=[]



app.get('/users',(req,res)=>{
    res.json(users);
})

app.post('/users', async (req,res) =>{
    try{
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        console.log(salt)
        console.log(hashPassword)
        const user ={name:req.body.name, password:hashPassword}
    users.push(user)
    res.status(201).send()
    }
    catch{
        res.status(500)
    }
})

app.post('/users/login', async (req,res) =>{
    const user=users.find(user =>user.name=== req.body.name)
    if(user == null){
        return res.status(400).send('cant find user')
    }
    try{
        if( await bcrypt.compare(req.body.password, user.password)){
            res.send('success')
        }else{
            res.send('not allowed')
        }
    }
    catch{
        res.send(500)
    }
})
app.listen(3000);
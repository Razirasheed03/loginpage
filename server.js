//express added
const express = require('express');
//need a variable for working
const app = express();
const hbs = require('hbs')
const session = require('express-session');
const nocache = require('nocache');
app.use(express.static('public'));
app.set('view engine', 'hbs');
const username = "admin"
const password = "admin123"
//function undefined removing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//session use
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
}))
app.use(nocache()); 

app.get('/', (req, res) => {   ///response send to request
    if(req.session.user){
        res.render('home')
    }else
    {
        if(req.session.passwordWrong){
        res.render('login',{msg:"invalid credentials"})
        req.session.passwordWrong=false
    }else
    {
        res.render('login')
    }

}
})

app.post('/verify', (req, res) => {
    console.log(req.body);
    if (req.body.username === username && req.body.password === password) {
        req.session.user = req.body.username
        res.redirect('/home')
    } else{
        console.log(req.session)
            req.session.passwordWrong=true
            res.redirect('/')
    }
})

app.get('/home',(req,res)=>{
    if(req.session.user){

        res.render('home')

    }else
    {
        if(req.session.passwordWrong){
        req.session.passwordWrong=false
        res.render('login',{msg:"invalid credentials"})
    }else
    {
        res.render('login')
    }

}
})
app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render('login',{msg:"Logged out successfully"})
})
 
//server created
app.listen(3000, () => console.log('Server running on port 3000'))
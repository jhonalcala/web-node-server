const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n');
    next();
})

app.use((req, res, next)=> {
    res.render('maintenance.hbs');
})

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Home Page',
        currentYear: new Date().getFullYear()
    })
});
app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'Welcome to About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage: 'Dont ever do this to me'
    })
    
})
app.listen(3000,()=>{
    console.log("Server start, listening on port 3000!");
});
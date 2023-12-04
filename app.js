const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');


app.engine('hbs', exhbs.engine({layoutsDir:'views/',defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');
app.set('views','views');


app.get('/', (req,res)=>{
    let message = 'Hello World';
    res.render('main', {message})
})
app.listen(8090,()=>{
    console.log('listening on port 8090');
})
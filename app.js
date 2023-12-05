const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dob = require('./db.js')


app.engine('hbs', exhbs.engine({layoutsDir:'views/',defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');
app.set('views','views');


app.get('/', async(req,res)=>{
    let database = await dob.getDataBase();
    const collection = database.collection('books');
    const curser = collection.find({});
    let employee  = await curser.toArray();

    let message = 'Hello World';
    res.render('main', {message,employee})
})

app.listen(8090,()=>{
    console.log('listening on port 8090');
})
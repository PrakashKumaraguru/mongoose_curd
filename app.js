const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dbs = require('./db.js');
const { Collection } = require('mongodb');


app.engine('hbs', exhbs.engine({layoutsDir:'views/',defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}));


app.get('/', async(req,res)=>{
    let database = await dbs.getDataBase();
    const collection = database.collection('books');
    const curser = collection.find({});
    let employee  = await curser.toArray();

    let message = '';
    switch (req.query.status) {
        case '1':
            message = 'data is inserted ';
            break;
    
        default:
            break;
    }
    res.render('main', {message,employee});
})
app.post('/stored-book',async(req,res) => {
    let database = await dbs.getDataBase();
    const collection = database.collection('books');
    let book = {title:req.body.title,author:req.body.author};
    await collection.insertOne(book);
    return res.redirect('/?status=1');
})

app.listen(8090,()=>{
    console.log('listening on port 8090');
})
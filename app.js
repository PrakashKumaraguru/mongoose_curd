const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dbs = require('./db.js');
const ObjectID = dbs.ObjectID;

 


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
    let edit_id, edit_book;

    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
       edit_book = await collection.findOne({_id:new ObjectID(edit_id)})
    }
    if (req.query.delete_id) {
        delete_id = req.query.delete_id;
        await collection.deleteOne({_id:new ObjectID(delete_id)});
        return res.redirect('/?status=3');
        
    }
    switch (req.query.status) {
        case '1':
            message = 'inserted successfully';
            break;
        case '2':
            message = 'updated sucessfully!';
            break;
        case '3':
            message = 'deleted succesfully!';
            break;
    
        default:
            break;
    }
    res.render('main', {message,employee,edit_id,edit_book});
})
app.post('/stored-book',async(req,res) => {
    let database = await dbs.getDataBase();
    const collection = database.collection('books');
    let book = {title:req.body.title,author:req.body.author};
    await collection.insertOne(book);
    return res.redirect('/?status=1');
})

app.post('/update-book/:edit_id',async(req,res) => {
    let database = await dbs.getDataBase();
    const collection = database.collection('books');
    let book = {title:req.body.title,author:req.body.author};
    let edit_id = req.params.edit_id;
    await collection.updateOne({_id: new ObjectID(edit_id)},{$set:book});
    return res.redirect('/?status=2');
})




app.listen(8090,()=>{
    console.log('listening on port 8090');
})
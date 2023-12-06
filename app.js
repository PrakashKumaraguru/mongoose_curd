const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dbs = require('./db.js');
const bookModel = require('./models/bookmodel.js');
// const ObjectID = dbs.ObjectID; // Uncomment this line if needed
dbs.getDataBase();

app.engine('hbs', exhbs.engine({
    layoutsDir: 'views/',
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    let books = await bookModel.find({});
    let message = '';
    let edit_id, edit_book;

    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        edit_book = await bookModel.findOne({ _id: edit_id });
    }

    if (req.query.delete_id) {
        delete_id = req.query.delete_id;
        await bookModel.deleteOne({ _id: delete_id });
        return res.redirect('/?status=3');
    }

    switch (req.query.status) {
        case '1':
            message = 'inserted successfully';
            break;
        case '2':
            message = 'updated successfully!';
            break;
        case '3':
            message = 'deleted successfully!';
            break;
        default:
            break;
    }

    res.render('main', { message, books, edit_id, edit_book });
});

app.post('/stored-book', async (req, res) => {
    const book = new bookModel({ title: req.body.title, author: req.body.author });
    book.save();
    return res.redirect('/?status=1');
});

app.post('/update-book/:edit_id', async (req, res) => {
    let book = { title: req.body.title, author: req.body.author };
    let edit_id = req.params.edit_id;
    await bookModel.updateOne({ _id: edit_id }, { $set: book });
    return res.redirect('/?status=2');
});

app.listen(8090, () => {
    console.log('listening on port 9080');
});

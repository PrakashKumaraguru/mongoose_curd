const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('bodyparser');
const { log } = require('console');

app.engine('hbs', exhbs.engine());
app.set('view engine','hbs');
app.set('views','views');

app.set('/', (req,res)=>{
    let message = 'Hello World';
})
app.listen(8090,()=>{
    log('listening on port 8090');
})
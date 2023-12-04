const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('bodyparser');

app.engine('hbs', exhbs.engine());
app.set('view engine','hbs');
app.set('views','views');


const express = require('express');
require('express-async-errors');
require('dotenv/config')

const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./router');

const app = express();
const port = 3000;

const pathViews = path.join(__dirname, '..', 'views')
const pathStatic = path.join(__dirname, '..', 'public')

app.use(express.static(pathStatic));
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'layouts' }));
app.set('view engine', 'hbs');
app.set('views', pathViews);

app.use(router)

app.listen(port, () => console.log(`server running http://localhost:${port}`));

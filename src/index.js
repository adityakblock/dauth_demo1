const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));;

// routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

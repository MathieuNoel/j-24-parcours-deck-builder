const dotenv = require('dotenv');

const express = require('express');
dotenv.config();

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const session = require('express-session');

/**
 * Create a session with cookie
 */
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "Guess it",
    cookie: {
      secure: false,
      maxAge: (1000*60*60)
      }
  })
);

app.use((req, res, next) => {
  if(!req.session.deck){
  req.session.deck = [];
  }
  next()
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`,`http://localhost:${PORT}`);
});

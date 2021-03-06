const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./api/config/keys');

// const profileRoutes = require('./api/routes/profile-routes');
const passportSetup = require('./api/config/passport-setup');
const Card = require('./api/models/card-model.js');
const cors = require('cors');

mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI);

const app = express();
const PORT = 3001;
app.use(bodyParser.json());

// cookie session age
app.use(
    cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set CORS here
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
});

require('./api/routes/auth-routes')(app);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./public/build"));
}

// const corsOptions = {
//   "origin": "http://localhost:3000",
//   "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
//   "preflightContinue": true,
//   "optionsSuccessStatus": 204,
//   "credentials": true // enable set cookie
// };
// app.use(cors());

// set up temporary view engine. remove once we fully connect to frontend
app.set('view engine', 'ejs');




mongoose.connect(keys.mongodb.dbURI, {useMongoClient: true}, (err) => {
  if (err) return console.log(err);
  console.log('Connected to FlashCards DataBase from Server.js!');
});

// set up auth routes
// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);

// create home route
// app.get('/', (req, res) => {
//   res.render('home', { user: req.user});
// });


// create calls to cards db
app.post('/cards', (req, res) => {
  const { _id, frontCard, backCard } = req.body;
  const card = new Card({_id, frontCard, backCard});
  card.save((err, newCard) => {
    if (err) return res.send(err);
    res.json(newCard)
  });
});

app.get('/cards', (req, res) => {
  console.log('Hello from app.get /cards route!');
  Card.find({}, (err, card) => {
    console.log("Cards Array", card);
    if (err) return res.send(err);
    res.send(card);
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log('ERROR port 3001');
  console.log(`Studdy Buddy now listening for requests on port ${PORT}`);
});
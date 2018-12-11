const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('passport-jwt'),
    app = express(),
    user = require('./routes/api/user'),
    profile = require('./routes/api/profile'),
    post = require('./routes/api/post');
const PORT = process.env.PORT || 3000;

//Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db,{ useNewUrlParser: true })
    .then(success => console.log('Connected to Db'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);

app.use('/api/users', user);
app.use('/api/profile', profile)
app.use('/api/posts', post)



app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
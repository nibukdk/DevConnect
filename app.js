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

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db)
    .then(success => console.log('Connected to Db'))
    .catch(err => console.log(err));
app.get('/', (req, res) => {
    res.status(200).send('This is home page.')
})

app.use('/api/users', user);
app.use('/api/profile', profile)
app.use('/api/posts', post)



app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
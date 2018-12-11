const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    Profile = require('../../models/profile'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    keys = require('../../config/keys'),
    passport = require('passport');




router.get('/', (req, res) => {
    res.status(200).json({ msg: 'THis is post page' })
})




module.exports = router;
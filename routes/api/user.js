const express = require('express'),
    router = express.Router(),
    User = require('../../models/User'),
    gravatar = require('gravatar'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    keys = require('../../config/keys'),
    passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register'),
    validateLoginInput = require('../../validation/login');



//Get Users Home Page
router.get('/', (req, res) => {
    res.status(200).json({ msg: 'THis is users page' })
});

// /api/users/register
//Register the user

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists'
            return res.status(400).json({ 'msg': errors.email })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm'//default
            });
            const newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                avatar: avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });


        }
    });
});


// /api/users/login
//To login the users
// Returns the JWT token

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email, password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                errors.email = 'USer not found'
                res.status(404).json(errors)
            }
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User found
                        //Create Jwt Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.email = 'Password do not match'
                        return res.status(400).json(errors)
                    }
                })


        }).catch(err => console.log(err));
});


//Get current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        msg: 'Success',
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

module.exports = router;
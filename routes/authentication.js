const express = require('express');
const passport = require('passport');
const initialize = require('./passport-config');

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const users = require('../models').users;
const checkNotAuthenticated = require('./route_middlewares/checkNotAuthenticated');

const router = express.Router();

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
});

router.post('/register', checkNotAuthenticated, [
    check('email').normalizeEmail(),
    check('email','You must inform a valid e-mail').isEmail(),

    check('email').custom(async function(value){
        var user = await users.findOne({where:{email:value}});
        if (user){
            return Promise.reject('This e-mail is already in use');
        }
    }),

    check('username','The username must contain only alphanumeric characters').isAlphanumeric(),
    check('username','The username is too long').isLength({max:60}),
    check('username','The username must not be empty').not().isEmpty(),
    check('username').trim().escape(),

    check('username').custom(async function(value){
        var user = await users.findOne({where:{username:value}});
        if (user){
            return Promise.reject('This username is already in use');
        }
    }),

    check('password').custom((value,{req}) => {
        if (value != req.body.passwordConfirm){
            throw new Error("Passwords don't match");
        } else return true;
    }),
    check('password','The password must contain a minimum of 6 characters').isLength({min:6}),
    check('password','The password must contain a maximum of 24 characters').isLength({max:24})],
    async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(422).render('register', { errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        users.create({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
            .then(user => {
                res.render('register', {alert:`${user.username} created successfully!`});
            })
            .catch(err => console.log(err));

    } catch {
        res.redirect('/register');
    }
});

router.get('/login', checkNotAuthenticated, (req, res) => res.render('login'));

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.delete('/logout', (req, res) => { //use method-override to be able to use delete req instead of post
    req.logOut();
    res.redirect('/auth/login');
});

module.exports = router;
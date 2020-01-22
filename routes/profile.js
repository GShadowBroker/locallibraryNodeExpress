'use strict';

const express = require('express');
const checkAuthenticated = require('./route_middlewares/checkAuthenticated');

const router = express.Router();

router.get('/', checkAuthenticated, (req, res) => {
    if (!req.user){
        return res.render('profile', {user: null});
    }
    return res.render('profile', {user: req.user});
});

module.exports = router;
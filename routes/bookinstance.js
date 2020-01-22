const express = require('express');
const bookinstances = require('../models').bookinstance;
const books = require('../models').book;

const router = express.Router();

router.get('/', function(req, res, next) {
    let findBooks = books.findAll({order:[['title','ASC']]});
    let findBookInstances = bookinstances.findAll({include: [{all:true}]});

    Promise.all([findBooks, findBookInstances])
        .then(responses => {
            let books = responses[0];
            let bookinstances = responses[1];

            res.render('bookinstancelist', {books:books, bookinstances:bookinstances});
        })
        .catch(err => console.log(err));
});

router.get('/create', function(req, res, next) {
    books.findAll({order:[['title','ASC']]})
        .then(books => {
            res.render('addbookinstance', {books});
        })
        .catch(err => console.log(err));
});

router.post('/create', function(req, res, next) {
    let { imprint, status, due_back, bookId } = req.body;
    let errors = [];

    //Validation
    if (!imprint){
        errors.push({message:"You MUST inform an Imprint!"});
    }
    if (imprint.length > 255){
        errors.push({message:"The informed imprint field has exceeded the maximum length of characters!"});
    }
    if (!['Available','Maintenance','Loaned','Reserved'].includes(status)){
        errors.push({message:"Invalid status!"});
    }
    if (due_back.slice(0,4) < new Date().getFullYear()){
        errors.push({message:"Due back can't be in the past!"});
    }

    if (errors.length > 0){
        return books.findAll({order:[['title','ASC']]})
            .then(books => {
                res.render('addbookinstance', {books, errors});
            })
            .catch(err => console.log(err));
    } else {
        return bookinstances.create(req.body)
            .then(() => {
                res.redirect('/bookinstances');
            })
            .catch(err => console.log(err));
    }
});

router.get('/:id', function(req, res, next) {
    return bookinstances.findOne({
        where: {
            id: req.params.id
        },
        include: [{all:true}]
    })
        .then(bookinstance => {
            res.render('bookinstancedetail', {bookinstance: bookinstance});
            // res.send(bookinstance);
        })
        .catch(err => console.log(err));
});

router.get('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Bookinstance delete GET');
});

router.post('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Bookinstance delete POST');
});

router.get('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Bookinstance update GET');
});

router.post('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Bookinstance update POST');
});

module.exports = router;

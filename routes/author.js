const express = require('express');
const authors = require('../models').author;

const router = express.Router();

router.get('/', function(req, res, next) {
    authors.findAll({
        include:[{all:true}]
    })
        .then(authors => {
            res.render('authorlist', {authors});
        })
        .catch(err => console.log(err));
});

router.get('/create', function(req, res, next) {
    res.render('addauthor');
});

router.post('/create', function(req, res, next) {
    let { first_name, family_name, date_of_birth, date_of_death } = req.body
    let errors = [];

    //Validation
    if (!first_name){
        errors.push({message:"You MUST enter the first name!"});
    }
    if (first_name.length > 255){
        errors.push({message:"The informed first name is too long!"});
    }
    if (!family_name){
        errors.push({message:"You MUST enter the family name!"});
    }
    if (family_name.length > 255){
        errors.push({message:"The informed family name is too long!"});
    }
    if (date_of_birth && date_of_death && (date_of_death.slice(0,4) - date_of_birth.slice(0,4) < 5)){
        errors.push({message:"Are you kidding me? The author can't be THIS young."});
    }
    if (date_of_birth && date_of_death && (date_of_death.slice(0,4) - date_of_birth.slice(0,4) > 120)){
        errors.push({message:"The author can't possibly be THIS old."});
    }
    if (!date_of_birth){
        date_of_birth = null;
    }
    if (!date_of_death){
        date_of_death = null;
    }

    //Save
    if (errors.length > 0){
        res.render('addauthor', {errors, first_name, family_name, date_of_birth, date_of_death});
    } else {
        authors.create({
            first_name,
            family_name,
            date_of_birth,
            date_of_death
        })
            .then(() => res.redirect('/authors'))
            .catch(err => console.log(err));
    }
});

router.get('/:id', function(req, res, next) {
    authors.findOne({
        where: {
            id: req.params.id
        },
        include: [{all:true}]
    })
        .then(author => {
            res.render('authordetail', {author});
        })
        .catch(err => console.log(err));
});

router.get('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Author delete GET');
});

router.post('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Author delete POST');
});

router.get('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Author update GET');
});

router.post('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Author update POST');
});

module.exports = router;

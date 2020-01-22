const express = require('express');
const genres = require('../models').genre;

const router = express.Router();

router.get('/', function(req, res, next) {
    genres.findAll({
        include: [{all:true}]
    })
        .then(genres => {
            res.render('genrelist', {genres})
        })
        .catch(err => console.log(err));
});

router.get('/create', function(req, res, next) {
    res.render('addgenre');
});

router.post('/create', function(req, res, next) {

    let { name } = req.body;
    let errors = [];

    // Validate
    if (!name){
        errors.push({message:"You MUST enter a name for the genre!"});
    }
    if (name.length > 255){
        errors.push({message:"The informed genre name is too long!"});
    }

    if (errors.length > 0){
        return res.render('addgenre', {errors});
    } else {
        genres.create(req.body)
            .then(() => res.redirect('/genres'))
            .catch(err => console.log(err));
    }
});

router.get('/:id', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genres detail - ' + req.params.id);
});

router.get('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genres delete GET');
});

router.post('/:id/delete', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genres delete POST');
});

router.get('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genres update GET');
});

router.post('/:id/update', function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genres update POST');
});

module.exports = router;

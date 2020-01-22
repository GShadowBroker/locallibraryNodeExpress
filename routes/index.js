var express = require('express');
const authors = require('../models').author;
const books = require('../models').book;
const genres = require('../models').genre;

const { Op } = require('sequelize');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    if (!req.user){
        return res.render('index', {name: null});
    }
    return res.render('index', {name: req.user.username});
});

router.get('/search', (req, res) => {
    books.findAll({
        where: {
            title: {
                [Op.iLike]: `%${req.query.title}%`
            }
        },
        include: [{all:true}]
    })
        .then(books => {
            res.render('searchresults', {books: books});
        })
        .catch(err => console.log(err));
});

module.exports = router;

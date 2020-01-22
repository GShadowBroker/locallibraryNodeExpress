const express = require('express');
const books = require('../models').book;
const genres = require('../models').genre;
const authors = require('../models').author;
const BookAuthor = require('../models').BookAuthor;

const router = express.Router();

router.get('/', function(req, res, next) {
	books.findAll({
		include: [{all: true}]
	})
		.then(books => res.render('booklist', {books}))
		.catch(err => console.log(err));
});

router.get('/create', function(req, res, next) {
	let findAuthors = authors.findAll({order: [['first_name','ASC']]}); //Already returns a promise :)
	let findGenres = genres.findAll({order: [['name','ASC']]});

	Promise.all([findAuthors, findGenres])
		.then(responses => {
			let authors = responses[0];
			let genres = responses[1];
			res.render('addbook', {authors:authors,genres:genres});
		})
		.catch(err => console.log(err));
});

router.post('/create', function(req, res, next) {
	let {title,authorId,summary,isbn,genreId} = req.body

	// Validation
	let errors = [];

	if (!title){
		errors.push({message:"You MUST enter a title!"});
	}
	if (title.length > 255){
		errors.push({message:"The informed title exceeded the maximum length of 255 characters"});
	}
	if (summary.length > 2000){
		errors.push({message:"The informed summary is too long!"});
	}
	if (!summary){
		errors.push({message:"You MUST enter a summary!"});
	}
	if (!isbn){
		errors.push({message:"You MUST provide an ISBN!"});
	}
	if (isbn.length > 20){
		errors.push({message:"The informed ISBN is too long!"});
	}
	if (!authorId){
		authorId = null;
	}
	if (!genreId){
		genreId = null;
	}

	//Post validation
	if (errors.length > 0){
		let findAuthors = authors.findAll({order: [['name','ASC']]}); //Already returns a promise
		let findGenres = genres.findAll({order: [['name','ASC']]});

		Promise.all([findAuthors, findGenres])
			.then(responses => {
				let authors = responses[0];
				let genres = responses[1];
				return res.render('addbook', {errors:errors,authors:authors,genres:genres});
			})
			.catch(err => console.log(err));
	} else {
		books.create({
			title,
			summary,
			isbn,
			genreId
		})
			.then(book => {
				if (authorId != null){
					return BookAuthor.create({
						bookId: book.id,
						authorId: authorId
					})
						.then(() => res.redirect('/books'))
						.catch(err => console.log(err));
				} else {
					return res.redirect('/books');
				}
			})
			.catch(err => console.log(err));
	}
});

router.get('/:id', function(req, res, next) {
	return books.findOne({
        where: {
            id: req.params.id
        },
        include: [{all:true}]
    })
        .then(book => {
            res.render('bookdetail', {book: book});
        })
        .catch(err => console.log(err));
});

router.get('/:id/delete', function(req, res, next) {
	res.send('NOT IMPLEMENTED: Book delete GET');
});

router.post('/:id/delete', function(req, res, next) {
	res.send('NOT IMPLEMENTED: Book delete POST');
});

router.get('/:id/update', function(req, res, next) {
	res.send('NOT IMPLEMENTED: Book update GET');
});

router.post('/:id/update', function(req, res, next) {
	res.send('NOT IMPLEMENTED: Book update POST');
});

module.exports = router;

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

//middleware for JSON data
const bodyParser = require('body-parser');

//middleware for putting something when you post it
const methodOverride = require('method-override');


const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments');
const Review = require('./models/review');
const Comment = require('./models/comment');


//must come below const app, but before routes
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


//local host database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

//heroku database. check phylis' "MONGODB_URI"
//const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');


//views middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//PHYLIS DOES IT THIS WAY
app.use( reviews);
app.use( comments);


//BELOW ARE ALL THE ROUTES IN APP.JS BEFORE SEPARATION OF CONCERNS / PHYLIS' HELP


//temporarily testing models
//const Schema = mongoose.Schema
//const Review = mongoose.model('Review', {
//  title: String,
//  description: String,
//  movieTitle: String,
//  rating: Number
//});
//
//const Comment = mongoose.model('Comment', {
//    title: String,
//    content: String,
//    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
//});


////root route
//app.get('/', (req, res) => {
//    Review.find()
//       .then(reviews => {
//         res.render('reviews-index', { reviews: reviews });
//       })
//       .catch(err => {
//         console.log(err);
//       })
//})
//
//// NEW review form
//app.get('/reviews/new', (req, res) => {
//  res.render('reviews-new', {});
//})
//
//// CREATE NEW review
//app.post('/reviews', (req, res) => {
//  Review.create(req.body).then((review) => {
//    console.log(review);
//    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
//  }).catch((err) => {
//    console.log(err.message);
//  })
//})
//
//// SHOW A single review by clicking on the title link in index, WITHOUT COMMENTS!!!
////app.get('/reviews/:id', (req, res) => {
////  Review.findById(req.params.id).then((review) => {
////    res.render('reviews-show', { review: review })
////  }).catch((err) => {
////    console.log(err.message);
////  })
////})
//
//// SHOW A single review by clicking on the title link in index, WITH COMMENTS!!!
//app.get('/reviews/:id', (req, res) => {
//  // find review
//  Review.findById(req.params.id).then(review => {
//    // fetch its comments
//    Comment.find({ reviewId: req.params.id }).then(comments => {
//      // respond with the template with both values
//      res.render('reviews-show', { review: review, comments: comments })
//    })
//  }).catch((err) => {
//    // catch errors
//    console.log(err.message)
//  });
//});
//
//// EDIT a review by clicking on the edit link in the shown review
//app.get('/reviews/:id/edit', (req, res) => {
//  Review.findById(req.params.id, function(err, review) {
//    res.render('reviews-edit', {review: review});
//  })
//})
//
//// UPDATE... does this replace EDIT? ...guess not...
//app.put('/reviews/:id', (req, res) => {
//  Review.findByIdAndUpdate(req.params.id, req.body)
//    .then(review => {
//      res.redirect(`/reviews/${review._id}`)
//    })
//    .catch(err => {
//      console.log(err.message)
//    })
//})
//
//// DELETE one review from the delete button on the "shown" review page
//app.delete('/reviews/:id', function (req, res) {
//  console.log("DELETE review")
//  Review.findByIdAndRemove(req.params.id).then((review) => {
//    res.redirect('/');
//  }).catch((err) => {
//    console.log(err.message);
//  })
//})
//
//
//
////start controllers/comments.js
//// CREATE Comment
//app.post('/reviews/comments', (req, res) => {
//  Comment.create(req.body).then(comment => {
//    res.redirect(`/reviews/${comment.reviewId}`);
//  }).catch((err) => {
//    console.log(err.message);
//  });
//});
//
//// DELETE
//app.delete('/reviews/comments/:id', function (req, res) {
//  console.log("DELETE comment")
//  Comment.findByIdAndRemove(req.params.id).then((comment) => {
//    res.redirect(`/reviews/${comment.reviewId}`);
//  }).catch((err) => {
//    console.log(err.message);
//  })
//})
////end controllers/comments.js



//the localhost port
app.listen(7000, () => {
    console.log('App listening on port 7000!')
})

//heroku port
//const port = process.env.PORT || 7000;
//app.listen(port);


module.exports = app;

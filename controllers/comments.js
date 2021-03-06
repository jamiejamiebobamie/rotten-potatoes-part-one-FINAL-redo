const express = require('express');
const app = express();
const Review = require('../models/review');
const Comment = require('../models/comment');


//module.exports = (app) => {
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
//
//};

//WAY #2
//phylis does not use the above method of exporting as a function
//// CREATE Comment
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  });
});

// DELETE
app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
    })
});

module.exports = app;

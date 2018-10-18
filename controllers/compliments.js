const express = require('express');
const app = express();
const Compliment = require('../models/compliment');
const Comment = require('../models/comment')
var admin = require('../app')
//
//module.exports = function(app, Review) {
//
//    //root route
//    app.get('/', (req, res) => {
//        Review.find()
//           .then(reviews => {
//             res.render('reviews-index', { reviews: reviews });
//           })
//           .catch(err => {
//             console.log(err);
//           })
//    });
//
//    // NEW review form
//    app.get('/reviews/new', (req, res) => {
//      res.render('reviews-new', {});
//  });
//
//    // CREATE NEW review
//    app.post('/reviews', (req, res) => {
//      Review.create(req.body).then((review) => {
//        console.log(review);
//        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//    // SHOW A single review by clicking on the title link in index
//    app.get('/reviews/:id', (req, res) => {
//      Review.findById(req.params.id).then((review) => {
//        res.render('reviews-show', { review: review })
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//    // EDIT a review by clicking on the edit link in the shown review
//    app.get('/reviews/:id/edit', (req, res) => {
//      Review.findById(req.params.id, function(err, review) {
//        res.render('reviews-edit', {review: review});
//      })
//  });
//
//    // UPDATE... does this replace EDIT? ...guess not...
//    app.put('/reviews/:id', (req, res) => {
//      Review.findByIdAndUpdate(req.params.id, req.body)
//        .then(review => {
//          res.redirect(`/reviews/${review._id}`)
//        })
//        .catch(err => {
//          console.log(err.message)
//        })
//    });
//
//    // DELETE one review from the delete button on the "shown" review page
//    app.delete('/reviews/:id', function (req, res) {
//      console.log("DELETE review")
//      Review.findByIdAndRemove(req.params.id).then((review) => {
//        res.redirect('/');
//      }).catch((err) => {
//        console.log(err.message);
//      })
//  });
//
//
//
//
//}

//when i comment out the root route in app.js, this does not work


// WAY #2
//phylis does it this way below


//Admin login page route
app.get('/login', (req, res) => {
  if (admin == false) {
  admin = true;
  res.render('admin-login-true', {});
} else {
    admin = false;
    res.render('admin-login-false', {});
};
});

    //root route :: display a compliment
    app.get('/', (req, res) => {
        Compliment.find()
           .then(compliments => {
             res.render('compliments-index', { compliments: compliments });
           })
           .catch(err => {
             console.log(err);
           })
    });

    // NEW compliment form
    app.get('/compliments/new', (req, res) => {
      res.render('compliments-new', {});
  });

    // CREATE NEW compliment
    app.post('/compliments', (req, res) => {
      Compliment.create(req.body).then((compliment) => {
        console.log(compliment);
        res.redirect(`/compliments/${compliment._id}`) // Redirect to compliments/:id
      }).catch((err) => {
        console.log(err.message);
      })
  });


  // SHOW A single compliment by clicking on the title link in index, WITH COMMENTS!!!
  app.get('/compliments/:id', (req, res) => {
    // find compliment
    Compliment.findById(req.params.id).then(compliment => {
        if (admin == false) {
      // fetch its comments
     // Comment.find({ complimentId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('compliments-show', { compliment: compliment})
    } else {
        res.render('compliments-show-admin', { compliment: compliment})
    }
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });


    // EDIT a compliment by clicking on the edit link in the shown compliment
    app.get('/compliments/:id/edit', (req, res) => {
      Compliment.findById(req.params.id, function(err, compliment) {
        res.render('compliments-edit', {compliment: compliment});
      })
  });

    // UPDATE... does this replace EDIT? ...guess not...
    app.put('/compliments/:id', (req, res) => {
      Compliment.findByIdAndUpdate(req.params.id, req.body)
        .then(compliment => {
          res.redirect(`/compliments/${compliment._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    });

    // DELETE one compliment from the delete button on the "shown" compliment page
    app.delete('/compliments/:id', function (req, res) {
      console.log("DELETE compliment")
      Compliment.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
  });

module.exports = app;



/// Get one random document from the mycoll collection.
//db..aggregate([{ $sample: { size: 1 } }])
//
//test: just showing one
app.get('/home', (req, res) => {
    Compliment.find()
       .then(compliments => {
         db.compliments.aggregate([{ $sample: { size: 1 }}]);
         res.render('home', { compliment: compliment });
       })
       .catch(err => {
         console.log(err);
       })
});

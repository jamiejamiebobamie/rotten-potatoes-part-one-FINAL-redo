const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//HOW THE TUTORIAL SAYS I SHOULD DO IT
//const Review = mongoose.model('Review', {
//    title: String,
//    description: String,
//    movieTitle: String,
//    rating: Number
//});
//
//module.exports = Review;


//HOW PHYLIS DOES IT
const ComplimentSchema = new Schema({
    compliment: String,
    author: String,
    time: String,
});

module.exports = mongoose.model('Compliment', ComplimentSchema);

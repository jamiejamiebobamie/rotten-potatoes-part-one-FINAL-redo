const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//HOW THE TUTORIAL SAYS I SHOULD DO IT
//const Comment = mongoose.model('Comment', {
//  title: String,
//  content: String
//  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
//});
//
//module.exports = Comment


//HOW PHYLIS DOES IT
const CommentSchema = new Schema({
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = mongoose.model("Comment", CommentSchema);

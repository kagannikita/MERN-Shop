var mongoose = require('./../database.js');
var Product = mongoose.model('product', {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  description: String,
  name: {
    type: String,
    required: true,
  },
  country:String,
  price:Number,
  currency:String,
  createdAt: {
    type: String,
    default: new Date()
  },
  image: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }]
});
module.exports = Product;

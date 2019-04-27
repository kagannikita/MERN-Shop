const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product',
  {useNewUrlParser: true}, function(error) {
    if (error) {
      console.log('Cannot connect to mongodb');
      process.exit(0);
    } else {
      console.log('Mongodb started on port 27017');
    }
  });
module.exports = mongoose;

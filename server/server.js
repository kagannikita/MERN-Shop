var bodyParser = require('body-parser');
var express = require('express');
var cors=require('cors');
var path = require('path');
var authRoute = require('./routes/authRoute');
var productroute = require('./routes/productroute.js');
var profileRoute = require('./routes/profileRoute');
var commentRoute = require('./routes/commentRoute');
var app = express();
app.use(bodyParser());
app.use(cors());
const uploadDir = path.join(__dirname, "uploads");
app.use(express.static(uploadDir));
app.use('/', productroute);
app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', commentRoute);
app.use(function(err, req, res, next) {
  console.log(err);
  const statusCode = err.status || 500;
  const errorResponse = {
    name: err.name,
    message: err.message,
    text: err.toString(),
    statusCode: statusCode
  };
  res.status(statusCode).send(errorResponse);
});
app.listen(3001, function() {
  console.log('Server working on port 3001');
})

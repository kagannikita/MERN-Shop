var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var uploadDir = path.join(__dirname, "../uploads");
var upload = multer({ dest: uploadDir });
var base64Img = require('base64-img');
var Product = require('./../database/models/product.js');
async function generateProducts() {
  for (var i = 1; i <= 30; i++) {
    var newProduct = new Product({
      name: 'Product name: ' + i,
      description: 'Description: '+ i,
    });
    await newProduct.save();
  }
}
router.get('/api/products', async function(request, response, next) {
  const perPage = request.query.perPage; //String
  const currentPage = request.query.currentPage;
  const searchText = request.query.searchText || "";
  const skipAmount = (parseInt(currentPage) - 1) * parseInt(perPage);
  const regex = new RegExp(searchText, 'gi');
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          'from': 'users',
          'localField': 'author',
          'foreignField': '_id',
          'as': 'author'
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          country:1,
          price:1,
          currency:1,
          image: 1,
          createdAt: 1,
          author: {
            $arrayElemAt: ['$author', 0]
          }
        }
      },
      {
        $project: {
          name: 1,
          country: 1,
          description:1,
          price:1,
          currency:1,
          image: 1,
          createdAt: 1,
          'author.login': 1
        }
      },
      {
        $match: {
          $or: [
            {name: regex},
            {description: regex},
            {country:regex},
            {price:regex},
            {currency:regex},
            {'author.login': regex}

          ]
        }
      },
      {
        $skip: skipAmount
      },
      {
        $limit: parseInt(perPage)
      }
    ]);
    const total = await Product.aggregate([
      {
        $lookup: {
          'from': 'users',
          'localField': 'author',
          'foreignField': '_id',
          'as': 'author'
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          country:1,
          price:1,
          currency:1,
          image: 1,
          createdAt: 1,
          author: {
            $arrayElemAt: ['$author', 0]
          }
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          country:1,
          price:1,
          currency:1,
          image: 1,
          createdAt: 1,
          'author.login': 1
        }
      },
      {
        $match: {
          $or: [
            {name: regex},
            {description: regex},
            {country:regex},
            {price:regex},
            {currency:regex},
            {'author.login': regex}
          ]
        }
      },
      {
        $count: 'total'
      }
    ]);
    response.send({
      products: products,
      total: total[0].total
    });
  } catch(err) {
    console.log(err);
    next(err);
  }
});
router.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId).populate({
    path: 'comments',
    select: 'createdAt user text',
    populate: {
      path: 'user',
      select: 'login avaPath'
    }
  }).then((product) => {
    res.send({
      product: product
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
});

module.exports = router;

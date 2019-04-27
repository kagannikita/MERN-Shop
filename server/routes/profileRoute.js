const router = require('express').Router();
const Product = require('./../database/models/product');
const User = require('./../database/models/user');
const passport = require('./../service/passport');
const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, "../uploads");
const upload = multer({ dest: uploadDir });
const base64Img = require('base64-img');
const requireSignIn = passport.authenticate('jwt', { session: false });
const fs = require('fs');
router.get('/api/profiles/products', requireSignIn, async (req, res, next) => {
    const user = req.user;
    try {
        const products = await Product.find({ author: user._id });
        res.send({
            products: products
        });
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

});
// СОЗДАНИЕ НОВОГО ПОСТА
router.post('/api/profiles/products', requireSignIn, upload.single('file'), function(request, response) {
    var name = request.body.name;
    var author = request.user._id;
    var country = request.body.country;
    var description=request.body.description;
    var price=request.body.price;
    var currency=request.body.currency;
    var newProductData = {
        name: name,
        author: author,
        description: description,
        country:country,
        price:price,
        currency:currency
    };
    var filePath = '';
    try {
        filePath = request.file.path;
    } catch(e) {
        console.log('File not found');
    }
    base64Img.base64(filePath, function(err, data) {
        if (err)
            console.log(err);
        else
            newProductData.image = data;
        var newProduct = new Product(newProductData);
        newProduct.save().then(function(savedProduct) {
            response.send({
                savedProduct: savedProduct
            })
        }).catch(function(error) {
            console.log(error);
            res.status(403).send(error);
        })
    });

});
router.delete('/api/profiles/products/:productId', requireSignIn, function(request, response) {
    const productId = request.params.productId;
    Product.findByIdAndDelete(productId).then((deletedProduct) => {
        if (deletedProduct == null) {
            response.status(400).send({message: 'Data with id does not exist'})
        } else {
            response.status(200).send({
                deletedProduct: deletedProduct
            })
        }
    }).catch((error) => {
        console.log(error);
        response.status(500).send(error);
    })
});
router.put('/api/profiles/products/:productId', requireSignIn, upload.single('file'), function(request, response) {
    var productId = request.params.productId;
    var name = request.body.name;
    var description = request.body.description;
    var country=request.body.country;
    var price=request.body.price;
    var currency=request.body.currency;
    var author = request.user._id;
    var filePath = '';
    try {
        filePath = request.file.path;
    } catch(e) {
        console.log('File not found');
    }
    const updateProduct = {
        name: name,
        author: author,
        description: description,
        country:country,
        price:price,
        currency:currency,
    };
    base64Img.base64(filePath, function(err, data) {
        if (err)
            console.log(err);
        else
            updateProduct.image = data;
        Product.findByIdAndUpdate(productId, {$set: updateProduct}, {new: true})
            .then(function(updatedProduct) {
                response.send({
                    updatedProduct: updatedProduct
                })
            }).catch(function(error) {
            console.log(error);
            response.status(500).send(error);
        });

    });
});
router.get('/api/profile', requireSignIn, async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
router.post('/api/profile/ava', requireSignIn, upload.single('file'), (req, res, next) => {
    const id = req.user._id;
    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop();
    const targetFile = id + '.' + fileExtension;
    const targetPath = path.join(uploadDir, "avas", targetFile);
    fs.rename(filePath, targetPath, function(err) {
        if (err) next(err);
        User.findById(id).then(user => {
            const previousAva = user.avaPath;
            user.avaPath = "/avas/" + targetFile;
            user.save().then(updatedUser => {
                if(previousAva && !previousAva.endsWith(fileExtension)) {
                    fs.unlink(previousAva, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                res.send(updatedUser);
            }).catch(err => next(err));
        }).catch(err => next(err));
    });
});
module.exports = router;

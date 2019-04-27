const router = require('express').Router();
const User = require('./../database/models/user');
const Product = require('./../database/models/product');
const Comment = require('./../database/models/comment');
const passport = require('./../service/passport');
const requireSignIn = passport.authenticate('jwt', { session: false });
router.post('/api/products/:productId/comments',
    requireSignIn,
    async (req, res, next) => {
        const text = req.body.text;
        const productId = req.params.productId;
        const user = req.user;
        try {
            const product = await Product.findById(productId);
            const newComment = new Comment({
                text: text,
                user: user._id,
                product: product._id
            });
            let savedComment = await newComment.save();
            savedComment = savedComment.toObject();
            savedComment.user = {
                login: user.login,
                avaPath: user.avaPath,
                _id: user._id
            };
            product.comments.push(savedComment._id);
            const updatedProduct = await product.save();
            res.send(savedComment);
        } catch(err) {
            next(err);
        }
    });
router.delete('/api/products/:productId/comments/:commentId',
    requireSignIn,
    async (req, res, next) => {
        const productId = req.params.productId;
        const commentId = req.params.commentId;
        try {
            const product = await Product.findById(productId);
            product.comments = product.comments.filter(comment => comment != commentId);
            const updatedProduct = await product.save();
            const deletedComment = await Comment.findByIdAndDelete(commentId);
            res.send(deletedComment);
        } catch(err) {
            next(err);
        }
    });
module.exports = router;

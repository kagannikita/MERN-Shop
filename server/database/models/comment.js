const mongoose = require('./../database');
const Comment = mongoose.model('comment', {
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
});

module.exports = Comment;

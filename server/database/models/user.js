const mongoose = require('./../database');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    login:{
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber:{
        type:Number,
        required:true,
        unique: true,
    },
    avaPath: String
});

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(error, salt) {
        if (error) {
            next(error);
        }

        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) {
                next(error);
            } else {
                user.password = hash;
                next();
            }
        });

    });
});

userSchema.methods.comparePasswords = function(plainPassword, next) {
    const user = this;

    bcrypt.compare(plainPassword, user.password, function(error, isEqual) {
        if (error) {
            next(error);
        }

        next(null, isEqual);

    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./../database/models/user');
const passport = require('./../service/passport');
const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        login: user.login
    }, 'counter-strike', { expiresIn: '2h' });
};
router.post('/api/auth/sign-up', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const login=req.body.login;
    const phonenumber=req.body.phonenumber;
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        login:login,
        phonenumber:phonenumber
    });
    user.save().then(savedUser => {
        res.status(201).send({
            token: generateToken(savedUser)
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    })
});
router.post('/api/auth/sign-in', (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    User.findOne({ login: login}).then(user => {
        if(user == null) {
            res.status(401).send('Login or password is wrong');
        } else {
            user.comparePasswords(password, function(error, result) {
                if(error || result == false) {
                    res.status(401).send('Login or password is wrong');
                } else {
                    res.send({
                        token: generateToken(user)
                    });
                }
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    });
});
router.get('/api/secret', passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send({
            data: 'Secret data',
            user: req.user
        });
    });
module.exports = router;

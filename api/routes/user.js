const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.name);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            console.log(user.length);
            if (user.length > 0) {
                return res.status(409).json({
                    message: "Mail exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {

                                res.set({
                                    'Access-Control-Allow-Origin': '*'
                                });
                                return res.redirect('/packages');
                                /*
                                res.status(201).json({
                                    message: 'User created'
                                });*/
                                console.log(user);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })

                            });
                    }
                });
            }
        })
});


router.get("/dosignup", (req, res, next) => {

    console.log('Request received from client for signup get');
    res.render('dosignup.ejs');
});
router.get("/home", (req, res, next) => {

    console.log('Request received from client for signup get');
    res.render('success.html');
});
router.get("/dologin", (req, res, next) => {

    console.log('Request received from client dologin get ');
    res.render('dologin.ejs');
});
router.get("/login", (req, res, next) => {

    console.log('Request received from client login get ');
    res.render('login.ejs');
    /*    User
            .find()
            .exec()
            .then(doc => {
                console.log("from database", doc);
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
      */
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                console.log(process.env.PORT)
                console.log(process.env.JWT_KEY)
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    console.log(token);
                    // ----- JSON.parse(localStorage.getItem(ALLCATEGORY))
                    // window.localStorage.setItem(JSON.stringify(token));
                    if (req.body.email === 'admin@gmail.com') {
                        return res.render('addpackages.ejs');
                    }
                    else {
                        return res.redirect('/packages');
                    }
                    
                    // headers: {
                    //     Accept: "*/*",
                    //     "Content-Type": "application/json;charset=UTF-8",
                    //     Authorization: `Bearer ${token}`
                    // }
                    // return null;

                    // return res.status(200).json({
                    //     message: "Auth successful",
                    //     token: token
                    // });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userid', (req, res, next) => {
    User.remove({ _id: req.params.userid })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
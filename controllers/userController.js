/**
 * User controllers
 * Controller based on user controllers for INFO30005 - Peer Reviewed
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Tehara Moonemalle - ID: 879459, Aug 23, 2019
 *
 **/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
var cloudinary = require("cloudinary");
require("../config/cloudinary.js");
const User = mongoose.model("user");




/****************** Controls ******************/
// updates a user's photo [DS OCT 26] 
var updatePhoto = async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No photos were uploaded.');
    }
    var file = req.files.photo
    if (!file.length){
        file = [file]
      }
    for (let i = 0; i < file.length; i++) {
        await cloudinary.v2.uploader.upload(file[i].tempFilePath, (error, result) => {
            if (result) {
                User.updateOne({ _id: req.params.userId }, { "imageReference": result.url })
                    .then(() => res.json('Image Changed!'))
                    console.log("testtest");
            } else if (error) {
                console.log(error)
            }
        })
    }
}

// updates a user's password [DS Aug 20] based on attributed code
var updatePassword = async function (req, res) {
    password = req.body.password
    bcrypt
        .genSalt(10)
        .then((salt) => {
            bcrypt
                .hash(password, salt)
                .then((hash) => {
                    password = hash;
                    User.updateOne({ _id: req.params.userId }, { "password": password})
                    .then(() => res.json('Password Changed!'))
                })
                .catch((err) => {
                    console.log("bcrypt error in user.js" + err);
                    user.password = null;
                });
        })
        .catch((err) => {
            console.log("bcrypt error in user.js" + err);
            user.password = null;
        });
}



// find username by id [TM Aug 21] based on attributed code
var findUser = function (req, res) {
    User
        .findOne({ _id: req.params.id })
        .then(found => {
            if (found) {
                res.send({ user: found });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).end();
            console.log(err);
        });
};


// delete an existing user by id (mongoDB assigned id) [TM Aug 21] based on attributed code
var deleteUser = function (req, res) {
    const { identity: { id } } = req;
    User.findById(id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
};


//Find user by email [TM Aug 21] based on attributed code
var findUserByEmail = function (req, res) {
    const { email } = req.body;
    User
        .findOne({ email: email })
        .then(found => {
            if (found) {
                res.send(found._id);
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).end();
            console.log(err);
        });
}


//Find all users [TM Sept 21]
var findAllUsers = function (req, res) {
    User.find((err, users) => {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(400);
            console.log("Error getting users", err);
        }
    });
};

//Create a new user [TM Sept 21] based on attributed code
var createNewUser = function (req, res) {
    //no blank usernames or passwords
    if (req.body.name == "" || req.body.familyName == "" || req.body.username == "" || req.body.password == "" || req.body.email == "" || req.body.dob == "") {
        res.sendStatus(422).end();
        console.log("Please fill required field")
        return;
    }
    const user = {
        name: req.body.name,
        familyName: req.body.familyName,
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
        dateJoined: req.body.dateJoined
    };

    //encrypts plaintext password
    User
        .findOne({ email: user.email })
        .then(found => {
            if (found) {
                res.status(422).end();
            } else {
                bcrypt
                    .genSalt(10)
                    .then((salt) => {
                        bcrypt
                            .hash(user.password, salt)
                            .then((hash) => {
                                user.password = hash;
                                const newUser = new User(user);

                                newUser
                                    .save()
                                    .then((newUser) => { res.send(newUser.toJson()) })
                                    .catch((err) => {
                                        res.sendStatus(500).end();
                                        console.log("Error adding user" + err);
                                    });
                            })
                            .catch((err) => {
                                console.log("bcrypt error in user.js" + err);
                                user.password = null;
                            });
                    })
                    .catch((err) => {
                        console.log("bcrypt error in user.js" + err);
                        user.password = null;
                    });
            }
        })
};

//Login [TM Sept 29] based on attributed code
var loginUser = function (req, res, next) {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    //authenticates user credentials against database
    passport.authenticate('local', function (err, passportUser, info) {
        if (err) {
            return next(err);
        }
        //generates token on succesful login
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toJSON() });
        }
        res.status(401).end();
    })(req, res, next);
};

// update an existing user's username and/or password [TM Oct 4] based on attributed code
var updateUser = function (req, res) {
  console.log("test");

    User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }, // making sure that res gives back updated object
        (err, update) => {
            if (err) return res.status(500).send(err);
            return res.send(update);
        }
    );
};

/********************* Exports *********************/
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findAllUsers = findAllUsers;
module.exports.createNewUser = createNewUser;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.updatePhoto = updatePhoto;
module.exports.updatePassword = updatePassword;
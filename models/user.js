/**
 * Model for user.
 * Model based on user model created for INFO30005 - Peer Reviewed
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Tehara Moonemalle - ID: 879459, Aug 20, 2019
 *
 **/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//model for user [TM Aug 20]
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    imageReference: {
        type: String,
        default: "https://res.cloudinary.com/dducaeiio/image/upload/v1571534505/default_user_gcme3f.png"
    }
});

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password)
};

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'top_secret_string');
}


userSchema.methods.toJson = function() {
    return {
        _id: this.id,
        username: this.username,
        token: this.generateJWT()
    }
}



mongoose.model("user", userSchema);

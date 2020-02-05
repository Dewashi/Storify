/**
 * Model for comment
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 10, 2019
 *
 **/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//model for comment [TM Aug 20]
const commentSchema = new mongoose.Schema ({
    userId: {
        type: String,
        required: true
    },
    artifactId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default : Date.now,
        required: true
    },
    parentId: {
        type: String,
         default : null

    },
});

mongoose.model("comment", commentSchema);

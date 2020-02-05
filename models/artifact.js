/**
 * Model for artifact.
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 10, 2019
 **/
var cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//model for Artifact [DS SEP 21]
const artifactSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    from: {
        type: String
    },
    ownedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    previousOwners: {
        type:[String]
    },
    tags: {
        primary: {
            type: String,
            required: true
        },
        subtags: {
            type: [String],
        }
    },
    dateAdded: {
        type: Date,
        required: true
    },
    imageReference: {
        type: [String]
    }
});

mongoose.model("artifact", artifactSchema);

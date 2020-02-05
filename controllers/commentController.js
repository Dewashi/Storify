/**
 * Comment controllers
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 10, 2019
 *
 **/


 /********************* Config *********************/
 var express = require('express');
 const mongoose = require("mongoose");
 const bcrypt = require("bcryptjs");
 const Comment = mongoose.model("comment");
 
 
 /****************** Controls ******************/
 // creates a comment based on the user ID and artifact ID (mongoDB assigned id) [DS Oct 10] 
 var createComment = function(req, res) {
     var userId = req.params.userId;
     var artifactId = req.params.artifactId;
     var username = req.body.username;
     var text = req.body.text;
     //const datePosted = req.body.ownedBy;
     var parentId = null;
 
     if (req.body.parentId != null){
         parentId = req.body.parentId
     }
     const newComment = new Comment({
         userId,
         artifactId,
         username,
         text,
         parentId,
     });
     newComment.save()
     .then((comment) => res.json(comment))
     .catch(err => res.status(400).json('Error: ' + err));
 };
 
 
 //reads a particular comment based on comment Id [DS Oct 10]
 var readOneComment = function(req, res) {
     Comment.find({commentId:req.params.commentId})
     .then(comment => res.send({comment}))
       .catch(err => res.json("This artifact does not have comments!"));
 }
 
 
 // returns all created comments based on the artifact page [DS Oct 10]
 var readAllComments = function(req, res) {
     Comment.find({artifactId:req.params.artifactId})
     .then(comment => res.send({comment}))
       .catch(err => res.json("This artifact does not have comments!"));
 }
 
 
 // updates a comment based on the artifact being commented on and the user trying to edit [DS Oct 10]
 var updateComment = function(req, res) {
     Comment.updateOne({_id:req.params.commentId,userId:req.params.userId},{ "text": req.body.text })
     .then(() => res.json('Comment updated!'))
       .catch(err => res.json("This comment cannot be edited or doesn't exist!"));
 };
 
 
 // updates a comment based on the artifact being commented on and the user trying to edit [DS Oct 10]
 var deleteComment = function(req, res) {
     Comment.remove({_id:req.params.commentId,userId:req.params.userId})
     .then(() => res.json('Comment deleted!'))
       .catch(err => res.json('This comment no longer exists!'));
 };
 
 
 /********************* Exports *********************/
 module.exports.createComment = createComment
 module.exports.readOneComment = readOneComment
 module.exports.readAllComments = readAllComments
 module.exports.updateComment = updateComment
 module.exports.deleteComment = deleteComment
 
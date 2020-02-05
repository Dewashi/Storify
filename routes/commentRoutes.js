/**
 * Comment router
 * Routes based on user routes created for INFO30005 - Peer Reviewed
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 10, 2019
 **/

 
/********************* Config *********************/
const router = require("express").Router();
const CommentController = require("../controllers/commentController.js")
var cloudinary = require("cloudinary");
require("../config/cloudinary.js");


/********************* Routes *********************/
router.post("/create/:artifactId/:userId", CommentController.createComment);
router.get("/readOne/:commentId", CommentController.readOneComment);
router.get("/readAll/:artifactId", CommentController.readAllComments);
router.post("/update/:commentId/:userId", CommentController.updateComment);
router.delete("/delete/:commentId/:userId", CommentController.deleteComment);
/********************* Export *********************/
module.exports = router;
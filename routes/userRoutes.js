/**
 * User router
 * Routes based on user routes created for INFO30005 - Peer Reviewed
 * COMPLETE
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Tehara Moonemalle - ID: 879459, Aug 23, 2019
 **/


 /********************* Config *********************/
 const router = require("express").Router();
 const auth = require("./auth.js");
 const UserController = require("../controllers/userController.js")
 var cloudinary = require("cloudinary");
 require("../config/cloudinary.js");
 
 
 /********************* Routes *********************/
 router.get("/:id", auth.optional, UserController.findUser);
 router.delete("/", auth.required, UserController.deleteUser);
 router.post("/add", auth.optional, UserController.createNewUser);
 router.post("/email", auth.required, UserController.findUserByEmail);
 router.get("/users", auth.required, UserController.findAllUsers);
 router.post("/login", UserController.loginUser);
 router.put("/update/:userId",auth.optional, UserController.updateUser);
 router.post("/updatePhoto/:userId", auth.optional, UserController.updatePhoto);
 router.post("/updatePassword/:userId", auth.required, UserController.updatePassword);
 /********************* Export *********************/
 module.exports = router;
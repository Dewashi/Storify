/**
* Main file
* Modified by Tehara Moonemalle - ID: 879459, Sept 21, 2019
* 2019 Sep 28 Modified by Xiaoxuan Li, in order to connect frontend 
*/


/********************* Config *********************/
const express = require ("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const passport = require('passport');
var session = require("express-session")
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../Frontend/build")));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
var fileupload = require("express-fileupload");
var cloudinary = require("cloudinary");
require("./config/cloudinary.js");
require('dotenv').config();
require('./models/db.js');
require("./config/passport.js");
const isProduction = process.env.NODE_ENV === 'production';


/********************* Body parser *********************/
app.use(bodyParser.json());
app.use(fileupload({
    useTempFiles: true
}
));
app.use(cors({ credentials:true, origin:true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


/********************* Routes *********************/
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);
const artifactRoutes = require("./routes/artifactRoutes.js");
app.use("/artifact", artifactRoutes);
const commentRoutes = require("./routes/commentRoutes.js");
app.use("/comment", commentRoutes);


if (process.env.NODE_ENV === 'production'){
  app.use(express.static('Frontend/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'));
  });
}


//Run Server!
const port = process.env.PORT || 6100;
app.listen(port, () => console.log(`Server started on port ${port}`));
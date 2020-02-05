/** Initialise database
* Initial commit/file creation by Tehara Moonemalle - ID: 879459, Aug 20, 2019
* Modified by Tehara Moonemalle - ID: 879459, Sept 21, 2019
*
*
*/

const mongoose = require("mongoose");


//connect to database!
const dbURI = process.env.MONGO_URL || 'mongodb+srv://Deevesh:odins_@rmy@users-yl0vo.mongodb.net/test?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true
};

mongoose.connect(dbURI, options).then(
 () => {
     console.log("Database connection established!");
 },
 err => {
     console.log("Error connection to database: ", err);
 }
);

// import models
require("./user.js");
require("./artifact.js");
require("./comment.js");

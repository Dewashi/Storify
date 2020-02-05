/**
 * Artifact router
 * INCOMPLETE
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 22, 2019
 **/

 
/********************* Config *********************/
const router = require("express").Router();
const ArtifactController = require("../controllers/artifactController.js")
var cloudinary = require("cloudinary");
require("../config/cloudinary.js");
var express = require('express');
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true
}
));


/********************* Routes *********************/
router.post("/add", ArtifactController.addArtifact);
router.delete("/:artifactId", ArtifactController.deleteArtifact);
router.get("/searchTitle/:term", ArtifactController.findArtifactByTitle);
router.get("/searchType/:term", ArtifactController.findArtifactByType);
router.get("/searchAll", ArtifactController.findAllArtifacts);
router.get("/downloadPhoto/:artifactId", ArtifactController.downloadPhoto);
router.get("/artifactDetails/:artifactId", ArtifactController.returnArtifactDetails);
router.put("/update/:artifactId", ArtifactController.updateArtifact);
router.post("/updatePhoto/:artifactId", ArtifactController.updatePhoto);
router.post("/removePhoto/:artifactId", ArtifactController.removePhoto);


/*Modified by Xiaoxuan Li Oct 3, 2019 for test purpose*/
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});
/********************* Export *********************/
module.exports = router;
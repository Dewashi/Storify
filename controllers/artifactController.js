/**
 * Artifact controllers
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Deevesh Shanmuganathan - ID: 912364, Sep 22, 2019
 *
 **/

 
/********************* Config *********************/
var cloudinary = require("cloudinary");
require("../config/cloudinary.js");
var express = require('express');
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload);
const mongoose = require("mongoose");
const Artifact = mongoose.model("artifact");


/****************** Controls ******************/
//removes selected photos from an artifact [DS OCT  26] 
var removePhoto = async function (req, res) {
	//stores the array of images to be removed
	imageReference = req.body.imageReference
	Artifact.update(
		{ _id: req.params.artifactId },
		{ $pull: { imageReference: { $in: imageReference }}})
		.then(() => res.json('Image Removed!'))
}


//adds artifact photos [DS OCT  26] 
var updatePhoto = async function (req, res) {
	var imageReference = []
	if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No photos were added.');
	}
	var file = req.files.photo
	//if a single json object is sent, it is put into an array
	if (!file.length){
			file = [file]
		}
		//uploads photos to cloudinary
	for (let i = 0; i < file.length; i++) {
			await cloudinary.v2.uploader.upload(file[i].tempFilePath, (error, result) => {
				if (result) {
					//pushes the url of the uploaded image
					imageReference.push(result.url)
				} else if (error) {
					console.log(error)
				}
			})
	}
	//adds each new image url to a pre-existing array of image url's
	Artifact.updateOne({ _id: req.params.artifactId },{ $addToSet: { imageReference: { $each: imageReference } } })
	.then(() => res.json('Images Added!'))
}


// adds an artifact to the database  [DS Oct 1]
var addArtifact = async(req, res, next) =>{
		//fields to be saved
		const title = req.body.title;
		const ownedBy = req.body.ownedBy;
		const description = req.body.description;
		const primary = req.body.primary;
		const subtags = req.body.subtags;
		var imageReference = [];
		const previousOwners = req.body.previousOwners;
		const dateAdded = req.body.dateAdded;
		var file = null;
		//checks if a photo is present (required)
		if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).send('No photos were uploaded.');
		}
		file = req.files.photo
		if (!file.length){
			file = [file]
		}
		//uploads artifact images
		for(let i = 0; i < file.length; i++){
						await cloudinary.v2.uploader.upload(file[i].tempFilePath, (error, result) => {
								if(result)
								{
									imageReference.push(result.url)
								} else if(error) {
									console.log(error)
								}
						})
		}
//saves artifact entry
		const newArtifact = new Artifact({
			title,
			ownedBy,
			description,
			dateAdded,
			imageReference,
			tags: {
				primary,
				subtags,
			},
			previousOwners,
	});
	newArtifact.save()
}


// delete an artifact by id (mongoDB assigned id) [DS Sep 28] based on attributed code
var deleteArtifact = function (req, res) {
		Artifact.remove({ _id: req.params.artifactId})
				.then(() => res.json('artifact deleted!'))
				.catch(err => res.json('This artifact no longer exists!'));
};


// sends artifact photo URL [DS Oct 1]
var downloadPhoto = function(req, res) {
	result =  Artifact.find({_id:req.params.artifactId},{
		'imageReference': 1})
	.then(artifact => res.send({artifact}))
	.catch(err => res.status(400).json('Error: ' + err));

}


// sends artifacts matching a seach by title of subtags [DS Oct 3]
var findArtifactByTitle = function(req, res) {
	result =  Artifact.find({ $or: [ {"title":new RegExp(req.params.term,'i')}, {"tags.subtags":new RegExp(req.params.term,'i')} ]})
	.then(artifact => res.send({artifact}))
	.catch(err => res.status(400).json('Error: ' + err));
};


//  sends artifacts matching a seach by category [DS Oct 3]
var findArtifactByType  = function(req, res) {
	result =  Artifact.find({ $or: [ {"tags.primary":new RegExp(req.params.term,'i')}, {"tags.subtags":new RegExp(req.params.term,'i')} ]})
	.then(artifact => res.send({artifact}))
	.catch(err => res.status(400).json('Error: ' + err));
};


// returns all artifacts [DS Oct 3]
var findAllArtifacts = function(req, res) {
	result =  Artifact.find({})
	.then(artifact => res.send({artifact}))
	.catch(err => res.status(400).json('Error: ' + err));
};


//Return artifact details [TM Oct 14]
var returnArtifactDetails = function(req, res) {
		result = Artifact.find({ _id: req.params.artifactId })
	.then(artifact => res.send({artifact}))
	.catch(err => res.status(400).json('Error: ' + err));
};

//updates artifact fields [TM Oct 26]
var updateArtifact = function (req, res) {
	console.log(req.body)
		Artifact.findByIdAndUpdate(
				req.params.artifactId,
				req.body,
				{ new: true }, // making sure that res gives back updated object
				(err, update) => {
						if (err) return res.status(500).send(err);
						return res.send(update);
				}
		);
};


var findAllDeals = function (req, res) {
		Artifact.find((err, artifacts) => {
				if (!err) {
						res.send(artifacts);
				} else {
						res.sendStatus(404);
						console.log("Error getting all Artifacts: ", err);
				}
		});
};


/********************* Exports *********************/
module.exports.addArtifact = addArtifact
module.exports.deleteArtifact = deleteArtifact
module.exports.downloadPhoto = downloadPhoto
module.exports.findArtifactByTitle = findArtifactByTitle
module.exports.findArtifactByType  = findArtifactByType
module.exports.findAllArtifacts  = findAllArtifacts
module.exports.returnArtifactDetails = returnArtifactDetails
module.exports.findAllDeals = findAllDeals
module.exports.updateArtifact = updateArtifact
module.exports.updatePhoto = updatePhoto
module.exports.removePhoto = removePhoto
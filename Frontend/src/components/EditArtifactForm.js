//date 21/09/19
//compontent for a form to allow editind an artifact information
//initial commit/file creation: odinw 831262

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from "axios"
import TagInput from "./TagInput"
import FormData from "form-data"

import './EditArtifact.css';

class EditArtifactForm extends React.Component {

 constructor(props) {
   super(props)
   //props take in previous artifact data
   this.state = {
	       artifactId: this.props.prevData.id,
           title: this.props.prevData.artifact.title,
           ownerFirstName: this.props.prevData.artifact.details.owner,
           ownerLastName: "",
           description: this.props.prevData.artifact.description,
           previousOwners: this.props.prevData.artifact.details.previousOwners,
           primaryTag: this.props.prevData.artifact.primaryTag,
           subtags: this.props.prevData.artifact.subtags,
           picture: this.props.prevData.imagesrc,
		   newPictureFiles: [],
		   newPictureURLs: [],
		   DeletedImages: [],
           showToast: false,
		   newOwner: false
       }
	   console.log(this.state.primaryTag)

       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleChange = this.handleChange.bind(this)
       this.getSubtags = this.getSubtags.bind(this)

       this.primaryTags = ["book", "jewllery", "paintings", "furniture", "picture", "misc" ]
   }



	//stop enter key from submitting the form
   onKeyPress(event) {
       if (event.key == "Enter") {
           event.preventDefault()
       }
   }

	//toggles the submit confirmation message
   toggleToast = (prevState) => {
     this.setState({showToast: !prevState.showToast})
   }

   //removes an image from the list, adds to a deleted images list
   removeImage = (i) => {
	   const newImgs = [...this.state.picture]

	   this.setState({DeletedImages: [...this.state.DeletedImages, this.state.picture[i]]},
		   () => {
			   newImgs.splice(i, 1)
			   this.setState( {picture: newImgs} )
		   }
	   )


   }

	//removes one of the newly added images
   removeNewImage = (i) => {
	   const newImgs = [...this.state.newPictureURLs];
	   const newfiles = [...this.state.newPictureFiles]
	   newfiles.splice(i, 1)
	   newImgs.splice(i, 1);
	   this.setState( {
		   newPictureURLs: newImgs,
		   newPictureFiles: newImgs
	   } )
   }


 	//handles behaviour for submitting the whole form
	handleSubmit(event) {
       event.preventDefault()

       const form = new FormData()

	    var data_url;
	    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	      // dev code
	      data_url = "http://localhost:6100";
	    } else {
	      // production code
	      data_url = "https://pair-looms.herokuapp.com";
	    }

       form.append("title", this.state.title)
       form.append("age","")
       form.append("from", "")
       form.append("ownedBy", this.state.ownerFirstName + " " + this.state.ownerLastName)
       form.append("description", this.state.description)
       form.append("primary", this.state.primaryTag)

       for (const t of this.state.subtags) {
           form.append("subtags", t)
       }

	   for (const o of this.state.previousOwners) {
           form.append("previousOwners", o)
       }

	   //newimages to be Added
	   const newImagesData = new FormData()
	   for (const f of this.state.newPictureFiles) {
		   newImagesData.append("photo", f)
	   }

       this.toggleToast(this.state)

	   //send main form data
       Axios.put(data_url + "/artifact/update/" + this.state.artifactId, form, {
           headers: {
               'content-type': 'multipart/form-data'
           }
       })
           .then(res => {
             console.log(res)
           })
           .catch(err => console.log(err.response) )

	   //send new images
	   Axios.post(data_url + "/artifact/updatePhoto/" + this.state.artifactId, newImagesData, {
           headers: {
               'content-type': 'multipart/form-data'
           }
       })
           .then(res => {
             console.log("new Images: ",res)
           })
           .catch(err => console.log(err.response))

	   //delete photos
	   console.log("to delete: ",this.state.DeletedImages)
	   Axios.post(data_url + "/artifact/removePhoto/" + this.state.artifactId, {imageReference: this.state.DeletedImages})
	   	.then(res => console.log("delete response: ", res))
   }

 	//handle change on the form
 	handleChange(event) {

		const {name, value, type, files} = event.target

		if (name === "picture") {
           //store the arrays of file paths and local urls
           var i
           var pic = []
           var picfiles = []
           for (i = 0; i < files.length; i++) {
               picfiles[i] = files[i]
               pic[i] = URL.createObjectURL(files[i])
           }
           this.setState({
               newPictureFiles : picfiles,
               newPictureURLs : pic
           })

	   } else {
	     this.setState({[name]: value})
	   }
   }

   //callback for getting subtags from the taginput component
   getSubtags(tags) {
       this.setState({
           subtags: tags
       })
   }

	//used for a callback from the taginput component
   getPrevOwners = (tags) => {
       this.setState({ previousOwners: tags })
   }

	//add a new owner, adds old owner to the previous owner list
	addNewOwner = () => {

	   const updated = [...this.state.previousOwners, this.state.ownerFirstName]
	   this.setState({previousOwners : updated},
		   this.setState({
			   newOwner: true,
			   ownerFirstName: ""
		   })
	   )
   }

 render() {

   return (
	   <div className="EditArtifact">
		   <div className="col-sm-6">
			   <form onSubmit={this.handleSubmit} onKeyDown={this.onKeyPress}>

				   {/*input title*/}
				   <div className="form-group">
					   <label for="title-input">Artifact Title:</label>
					   <input className="form-control"   name="title" type="text" id="title-input" value={this.state.title} placeholder="eg: Pearl Chain" onChange={this.handleChange} />
				   </div>

				   {/*input the owners first and last names*/}
				   {this.state.newOwner ?
				   <div className="form-group">
					   <label for="desc">Artifact Owner:</label>
					   <input className="form-control" type="text"  name="ownerFirstName" value={this.state.ownerFirstName} id="desc" placeholder="eg: Doc" onChange={this.handleChange} />
				   </div> : <button className="submit-button" onClick={this.addNewOwner}>New Owner</button>}

				   {/*textarea input for an item description*/}
				   <div className="form-group">
					   <label for="desc">Artifact Description:</label>
					   <textarea className="form-control" name="description" value={this.state.description} id="desc" placeholder="Belonged to Grandma Clair, 20 fresh water pearls" onChange={this.handleChange} />
				   </div>

				   {/*input previous owners*/}
				   <div className="form-group">
					   <label>Enter Previous Owners:</label>
					   <TagInput handTagsFunction={this.getPrevOwners} subtags={this.state.previousOwners} />
				   </div>

				   {/*drop down menu to set the primary tag*/}
				   <div className="form-group">
					   <label for="primaryTag">Primary Tag</label>
					   <select className="form-control" name="primaryTag" value={this.state.primaryTag} id="primaryTag" onChange={this.handleChange}>
						   <option value="none">Select a tag...</option>
						   {this.primaryTags.map(tag => <option value={tag}>{tag}</option>)}
					   </select>
				   </div>

				   {/*input subtags*/}
				   <div className="form-group">
					   <label>Subtags:</label>
					   <TagInput handTagsFunction={this.getSubtags} subtags={this.state.subtags} />
				   </div>

				   {/*place to display the image(s) before upload*/}
				   <div className="faf282 col-sm-6">
				   		<p>old images</p>
					   <div className="border row">
						   {this.state.picture.map(
							   (p,i) =>
							   (
								   <div className="col-sm-4">
									   <img className="img-thumbnail" src={p}/>
									   <button type="button" className="btn" onClick={() => { this.removeImage(i); }}>x</button>
								   </div>
							   )
						   )}
					   </div>
					   <p>new images</p>
					   <div className="border row">
						   {this.state.newPictureURLs.map(
							   (p,i) =>
							   (
								   <div className="col-sm-4">
									   <img className="img-thumbnail" src={p}/>
									   <button type="button" className="btn" onClick={() => { this.removeNewImage(i); }}>x</button>
								   </div>
							   )
						   )}
					   </div>
				   </div>

				   {/*upload image(s) of the artifact*/}
				   <div className="form-group">
					   <label for="picture">Add New Images</label>
					   <input className="form-control" type="file" name="picture" id="picture" accept="image/*" multiple onChange={this.handleChange} />
				   </div>

				   {/*submit button*/}
				   <div className="form-group">
					   <button className="submit-button" onSubmit={this.handleSubmit}>Submit</button>
				   </div>
			   </form>

		   </div>
		   {/*toast for confirmation*/}
		   <Modal isOpen={this.state.showToast} toggle={()=>this.toggleToast(this.state)} size="m">
			   <ModalHeader toggle={()=>this.toggleToast(this.state)}>Confirmation</ModalHeader>
			   <ModalBody>
			   		<h4>Successfully added</h4>
			   </ModalBody>
			   <ModalFooter>
				   <Button className="edit-button" onClick={() =>{
						   this.toggleToast(this.state)
						   window.location.reload()
					   	}
				    }>Close</Button>
			   </ModalFooter>
		   </Modal>
	   </div>
   )

 }


}

export default EditArtifactForm

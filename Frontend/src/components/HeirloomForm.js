//date 21/09/19
//compontent for a form to allow adding a new heirloom
//initial commit/file creation: odinw 831262

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from "axios"
import TagInput from "./TagInput"
import FormData from "form-data"

import './HeirloomForm.css'

class HeirloomForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
            title: "",
			from: "",
			ownerFirstName: "",
			ownerLastName: "",
			description: "",
			previousOwners: [],
            primaryTag: "none",
            subtags: [],
            picture: [],
            pictureFiles: [],
			showToast: false
        }

		this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getSubtags = this.getSubtags.bind(this)

        this.primaryTags = ["Book", "Jewellery", "Painting", "Furniture", "Picture", "Other" ]
    }

	//to disable enter from submitting
    onKeyPress(event) {
        if (event.key == "Enter") {
            event.preventDefault()
        }
    }

	//toggles confirmation of submit button
	toggleToast = (prevState) => {
		console.log("toggled", prevState)
		this.setState({showToast: !prevState.showToast})
	}


	//handles behaviour for submitting the whole form
    handleSubmit(event) {
        event.preventDefault()

        var data_url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
          // dev code
          data_url = "http://localhost:6100";
        } else {
          // production code
          data_url = "https://pair-looms.herokuapp.com";
        }

        const form = new FormData()

        form.append("title", this.state.title)
        form.append("age","")
        form.append("from", "")
        form.append("ownedBy", this.state.ownerFirstName + " " + this.state.ownerLastName)
        form.append("description", this.state.description)
        form.append("primary", this.state.primaryTag)
        form.append("dateAdded", Date())

        for (const t of this.state.subtags) {
            form.append("subtags", t)
        }

        for (const f of this.state.pictureFiles) {
            form.append("photo", f)
		}

		for (const o of this.state.previousOwners) {
            form.append("previousOwners", o)
        }

        console.log(this.state.subtags)

				this.toggleToast(this.state)

        Axios.interceptors.request.use(request => {
            console.log('Starting Request', request)
            return request
        })

        Axios.post(data_url + "/artifact/add", form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
							console.log(res)
						})
            .catch(err => console.log(err.response) )

        //reset form
        this.setState({
            title: "",
            firstRecordedDate: Date,
            from: "",
            ownerFirstName: "",
            ownerLastName: "",
            description: "",
            previousOwners: [],
            primaryTag: "none",
            subtags: [],
            dateAdded: "",
            picture: [],
            pictureFiles: []
        })

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
                pictureFiles : picfiles,
                picture : pic
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

	//callback for getting previousOwners
    getPrevOwners = (tags) => {
        this.setState({ previousOwners: tags })
    }

	render() {

		return (
			<div className="HeirloomForm row">
                <div className="66DAC7col-sm-6">
                    <form onSubmit={this.handleSubmit} onKeyDown={this.onKeyPress}>

                        {/*input title*/}
                        <div className="form-group">
                            <label for="title-input">Artifact Title:</label>
                            <input className="form-control" required name="title" type="text" id="title-input" value={this.state.title} placeholder="eg: Pearl Chain" onChange={this.handleChange} />
			            </div>


                        {/*input the owners first and last names*/}
						<div className="form-group">
                            <label for="desc">Artifact Owner:</label>
                            <input className="form-control" type="text" required name="ownerFirstName" value={this.state.ownerFirstName} id="desc" placeholder="eg: John" onChange={this.handleChange} />
                            <input className="form-control" type="text" required name="ownerLastName" value={this.state.ownerLastName} id="desc" placeholder="eg: Smith" onChange={this.handleChange} />
						</div>

                        {/*textarea input for an item description*/}
						<div className="form-group">
                            <label for="desc">Artifact Description:</label>
                            <textarea className="form-control" required name="description" value={this.state.description} id="desc" placeholder="eg: 20 fresh water pearls" onChange={this.handleChange} />
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

                        {/*upload image(s) of the artifact*/}
						<div className="form-group">
                            <label for="picture">Upload Images</label>
                            <input className="form-control" required type="file" name="picture" id="picture" accept="image/*" multiple onChange={this.handleChange} />
                        </div>

                        {/*submit button*/}
                        <div className="form-group">
                            <button className="submit-button" onSubmit={this.handleSubmit}>Submit</button>
                        </div>
					</form>

                </div>

                {/*place to display the image(s) before upload*/}
                <div className="66DAC7 col-sm-6">
                    <div className="row">
                        {this.state.picture.map(
                            p =>
                            (
                                <div className="col-sm-4">
                                    <img className="img-thumbnail" src={p} />
                                </div>
                            )
                        )}
                    </div>
                </div>
					{/*toast for confirmation*/}
					<Modal isOpen={this.state.showToast} toggle={()=>this.toggleToast(this.state)} size="m">
                    <ModalHeader toggle={()=>this.toggleToast(this.state)}>Confirmation</ModalHeader>
                    <ModalBody>
											<h4>Artifact successfully added!</h4>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggleToast(this.state)}>Close</Button>
                    </ModalFooter>
                </Modal>
			</div>
		)
	}


}

export default HeirloomForm

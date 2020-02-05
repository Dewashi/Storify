//component to show the details for an artifact
//initial commit/file creation: odinw 831262

import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Button } from "react-bootstrap"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Usericon from './usericon.PNG';
import Switch from "./Logout.PNG";
import LogoutModal from './LogoutModal';

import CommentTree from "./CommentTree"
import EditArtifactForm from "./EditArtifactForm"

import './ArtifactDetail.css';

class ArtifactDetail extends React.Component {

    constructor(props) {
        super(props)

        this.commentSubmit = this.commentSubmit.bind(this)
        this.deletThis = this.deletThis.bind(this)
        this.navigateToProfile = this.navigateToProfile.bind(this)
        this.stay = this.stay.bind(this)
        this.logout = this.logout.bind(this)
        this.toggleEditModalOpen = this.toggleEditModalOpen.bind(this)
		this.toggleDeleteConfirmation = this.toggleDeleteConfirmation.bind(this)


        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
             // dev code
            this.ApiURL = "http://localhost:6100"
        } else {
            // production code
            this.ApiURL = "https://pair-looms.herokuapp.com"
        }
        

        this.state = {
            id: props.artifactId,
            artifact: {
                details: {
					owner: "",
					previousOwners: [],
					dateAdded: ""
				},
                subtags: []
            },
            imagesrc: [
                "https://via.placeholder.com/468.png?text=loading"
            ],

            comments: [],
            childComments: [],
            showModal: false,
            isLoaded: false,
			deleteModalOpen: false
        }
    }

    navigateToProfile = () => {
        window.location = '/Profile';
    }

    stay = () => {
        window.location = '/Home';
    }

    logout = () => {
        window.location = '/';
    }


	//on component mounting
    componentDidMount() {

        //api request to backend for artifact details
        Axios.get(this.ApiURL + "/artifact/artifactdetails/" + this.state.id)
            .then(res => {
                this.setState({
                    artifact: {
                        title: res.data.artifact[0].title,
                        details: {
                            owner: res.data.artifact[0].ownedBy,
                            previousOwners: res.data.artifact[0].previousOwners,
                            dateAdded: Date(res.data.artifact[0].dateAdded).toString()
                        },
                        primaryTag: res.data.artifact[0].tags.primary,
                        subtags: res.data.artifact[0].tags.subtags,
                        description: res.data.artifact[0].description,
                        editModalOpen: false
                    },

                    imagesrc: res.data.artifact[0].imageReference

                }, this.setState({ isLoaded: true }))
            })
            .catch(err => {
                console.error(err)
            })

        //get the comments for the artifact
        Axios.get(this.ApiURL + "/comment/readAll/" + this.state.id)
            .then(res => {
                //console.log(res.data)
                this.setState({
                    comments: res.data.comment.filter(c => c.parentId === null),
                    childComments: res.data.comment.filter(c => c.parentId !== null)
                })
            })
            .catch()

    }

    //submit a comment
    commentSubmit(event) {
        event.preventDefault()
        const newComment = event.target.comment.value
        event.target.reset()

		//clean up comment data
        const comment = {
            userId: JSON.parse(localStorage.getItem("user"))._id,
            artifactId: this.state.id,
            username: JSON.parse(localStorage.getItem("user")).username,
            text: newComment,
            datePosted: Date(),
            parentId: null
        }

		//send request to create new comment
        Axios.post(this.ApiURL + "/comment/create/" + this.state.id + "/" + comment.userId, comment)
            .then(res => {
                //add the new comment to the array
                if (res.data.parentId == null) {
                    this.setState({ comments: this.state.comments.concat(res.data) })
                } else {
                    this.setState({ childComments: this.state.childComments.push(res.data) })
                }
            })
            .catch(err => console.log(err.response))

    }

	//helper to render each image carousel item
    renderCarouselItem(source) {
        return (
            <Carousel.Item>
                <img className="harousel" src={source} style={{ maxWidth: "100%", maxHeight: 400, objectFit: "contain" }} />
                <Carousel.Caption><a href={source} download={source}><Button variant="info" size="sm">view</Button></a></Carousel.Caption>
            </Carousel.Item>
        )
    }

	//deletes the artifact
    deletThis() {
        Axios.delete(this.ApiURL + "/artifact/" + this.state.id)
            .then(res => console.log(res.data))

        window.location = "/Home";
    }

	//opens the modal form for artifact editing
    toggleEditModalOpen() {
        this.setState({ editModalOpen: !this.state.editModalOpen })
    }

	//toggle the confirmation popup for deleting the artifact
	toggleDeleteConfirmation() {
		this.setState({deleteModalOpen: !this.state.deleteModalOpen})
	}

    render() {
        let logoutModalClose = () => { this.setState({ showModal: false }) }
        return (
            <div>
                <div className="navbar">
                    <NavLink onClick={this.stay} className="navbar-brand" >Shanmuganathan Registry</NavLink>
                    <img className="Usericon" src={Usericon} width="100vh" height="50vh" alt="Profile"
                        onClick={this.navigateToProfile} />
                    <img className="Logout" src={Switch} width="45px" height="38px" alt="Logout-Button"
                        onClick={() => { this.setState({ showModal: true }) }} />
                </div>
                <div className="container-fluid">
                    <div className="container-2">
                    </div>
                    <div className="row-2">
                        <div className="carso">
                            <Carousel>
                                {this.state.imagesrc.map(this.renderCarouselItem)}
                            </Carousel>
                        </div>
                        <div className="container-3">
                        </div>
                        <div className="container-2">
                            <div className="description">
                                <h4>{this.state.artifact.title}</h4>
                                <p>{this.state.artifact.description}</p>
                            </div>
                            <div className="details-2">
                                <dl className="row">
									<div className="col-sm-6">
						                <dt>{"Owner"}</dt>
						                <dd>{this.state.artifact.details.owner}</dd>
						            </div>
									<div className="col-sm-6">
						                <dt>{"Previous Owners"}</dt>
						                <dd>{this.state.artifact.details.previousOwners.map(v => v + " ")}</dd>
						            </div>
									<div className="col-sm-6">
						                <dt>{"Date Added"}</dt>
						                <dd>{this.state.artifact.details.dateAdded}</dd>
						            </div>
                                </dl>
                            </div>
                            <div className="container-6">
                            </div>
                            <div className="tags">
                                <h4 className="tag">Tags</h4>
                                <ul className="tag-">
                                    {this.state.artifact.subtags.map(t => <li className="badge badge-pill badge-info">{t}</li>)}
                                </ul>
                            </div>
                            {this.state.isLoaded ? <div>
                                <button className="delete-button" onClick={this.toggleDeleteConfirmation} >Delete Artifact</button>
                                <button className="edit-button" onClick={this.toggleEditModalOpen}>Edit Details</button>
                            </div> : <div></div>}
                            <Modal isOpen={this.state.editModalOpen} size="xl">
                                <ModalBody>
                                    <EditArtifactForm prevData={this.state} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.toggleEditModalOpen}>close</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className="container-3">
                        </div>
                        <div className="container-2">
                            <h4>Comments</h4>
                            <div className="commentborder">
                                {(this.state.comments.length > 0) ?
                                    this.state.comments.map(c => <CommentTree self={c} subComments={this.state.childComments} />)
                                    : <p>No comments yet!</p>}
                            </div>

                            {/*form for adding a new root comment*/}
                            <form className="form" autocomplete="off" onSubmit={this.commentSubmit}>
                                <div className="form-row">
                                    <div className="col-10">
                                        <textarea name="comment" className="form-control" placeholder="Add comment" />
                                    </div>
                                    <div className="col-auto">
                                        <button className="post-button" type="submit" value="submit">Post</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                	</div>
                </div>
                <div>
					{/*modals for logging out and deleting*/}
                    <LogoutModal onHide={logoutModalClose} show={this.state.showModal} Logout={this.logout} />
					<Modal isOpen={this.state.deleteModalOpen}>
						<ModalBody>
							<h4>are you sure?</h4>
						</ModalBody>
						<ModalFooter>
							<Button onClick={this.deletThis}>delete</Button>
							<Button onclick={this.toggleDeleteConfirmation}>cancel</Button>
						</ModalFooter>
					</Modal>
                </div>
            </div >
        )
    }
}

export default ArtifactDetail

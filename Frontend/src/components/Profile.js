/**
 * Artifact List Page
 * INCOMPLETE
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Xiaoxuan Li - ID: 933206, Sep 21, 2019
 **/

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom" ;
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from "axios"
import Switch from "./Logout.PNG";
import HeirloomForm from './HeirloomForm';
import LogoutModal from './LogoutModal';
import UserUpdateModal from './userUpdateModal';
import './Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchImage = this.fetchImage.bind(this)

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            user: JSON.parse(localStorage.getItem('user')) || [],
            showModal: false,
            showUpdateModal: false,
            modal: false,
        }
    }

  componentDidMount() {
    console.log(this.state.user);
  }

  navigate=()=>{
    window.location='/Home';
  }

  logout=()=>{
    window.location='/';
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

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

        const imagefile = event.target.image.files[0]

        const form = new FormData()
        form.append("photo", imagefile)

        console.log(this.state.user)


        //update the users profile photo
        Axios.post(data_url + "/user/updatePhoto/" + this.state.user._id, form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log("post new photo", res)
                this.fetchImage()
            })
            .catch(err => console.log(err.response))

        this.toggle()

    }

    fetchImage() {
      
        var data_url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
          // dev code
          data_url = "http://localhost:6100";
        } else {
          // production code
          data_url = "https://pair-looms.herokuapp.com";
        }

        //get new image to update
        Axios.get(data_url + "/user/" + this.state.user._id)
            .then(res => {
                console.log("the updated user?: ", res.data.user)
                this.setState({
                    user: res.data.user
                })
                localStorage.setItem('user', JSON.stringify(this.state.user))
            })
            .catch(err => console.log(err.response))
    }


    renderModal = () => {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="m">
                <ModalHeader toggle={this.toggle}>Choose New Profile Picture</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <input type="file" name="image"></input>
                        <div className="form-group-forButton">
                            <button className="SubmitButton" onSubmit={this.handleSubmit}>submit</button>
                            <button onClick={this.toggle}>Close</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        )
    }

  render() {
    let logoutModalClose = () =>{ this.setState({showModal:false})}
    let updateModalClose = () =>{ this.setState({showUpdateModal:false})}

    return (
    <Router>
      <div className="Profile">
        <div className="navbar">
            <NavLink onClick={this.navigate} className="navbar-brand" >Shanmuganathan Registry</NavLink>
            <img className="Logout" src={Switch} width="45px" height="38px" alt="Logout-Button"
            onClick = {()=>{this.setState({showModal:true})}} />
        </div>


        <div className="Profile__Aside">
            <div className="overlayContainer">
                <img src={this.state.user.imageReference} onClick={this.toggle} className="UserAvatar" alt="User Avatar" />
                <div className="overlayText" onClick={this.toggle}>Change</div>
            </div>
            {this.renderModal()}

          <NavLink to="/manage-artifact" className="ForwardNavigator"
          activeClassName="ForwardNavigator__Active">Add Artifact</NavLink>

          <NavLink to="/Profile" className="BackNavigator"
          activeClassName="BackNavigator__Active">User Details</NavLink>

        </div>
        <div className="Profile__Details">
          <Route className="Artifact__Form" path="/manage-artifact" component={HeirloomForm}></Route>
          <Route path={"/Profile"} render={props => (
            <div className="user">
              <p className="userPage">Welcome {this.state.user.username}!</p>
              <p className="UserInfo">First Name: {this.state.user.name}</p>
              <p className="UserInfo">Last Name: {this.state.user.familyName}</p>
              <p className="UserInfo">DOB: {this.state.user.dob}</p>
              <p className="UserInfo">Email: {this.state.user.email}</p>
              <button onClick = {()=>{this.setState({showUpdateModal:true})}}>Update user</button>
            </div>
            )}
          />

        </div>
        <div>
          <LogoutModal onHide={logoutModalClose} show={this.state.showModal} Logout={this.logout}/>
        </div>
        <div>
          <UserUpdateModal onHide={updateModalClose} show={this.state.showUpdateModal} user={this.state.user}/>
        </div>
      </div>

    </Router>

    )
  }
}

export default Profile

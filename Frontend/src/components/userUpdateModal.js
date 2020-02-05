//created by Xiaoxuan Li

import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, FormFeedback, Alert, Spinner } from "reactstrap";
import axios from "axios"

class UserUpdateModal extends React.Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeFamilyName = this.onChangeFamilyName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
      name:this.props.user.name,
      familyName:this.props.user.familyName,
      username:this.props.username,
      dob:this.props.user.dob
    };
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    });
  }
  onChangeFamilyName(e){
    this.setState({
      familyName: e.target.value
    });
  }
  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }
  onChangeDOB(e){
    this.setState({
      dob: e.target.value
    });
  }

  onSubmit(e){

    var data_url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      data_url = "http://localhost:6100";
    } else {
      // production code
      data_url = "https://pair-looms.herokuapp.com";
    }

    e.preventDefault();

    const newUser = {
      _id: this.props.user._id,
      name: this.state.name,
      familyName: this.state.familyName,
      username: this.state.username,
      email: this.props.user.email,
      dob: this.state.dob,
      password: this.props.user.password,
      dateJoined: this.props.user.dateJoined,
      imageReference: this.props.user.imageReference
    }

    axios.put(data_url + '/user/update/'+this.props.user._id, newUser)
          .then(res=>{console.log(res)})
          .catch(err=>{console.log(err)})

  localStorage.setItem('user', JSON.stringify(newUser))

    this.props.onHide();
    //will add axios post later

}

    render() {
        return (
          <Modal class="modal" tabindex="-1" isOpen={this.props.show}>
              <ModalHeader>
                Update User Information
              </ModalHeader>

              <ModalBody>
              <div>
                <Form onSubmit={this.onSubmit}>
                <div>
                  <label>Username: </label>
                  <Input type="text"
                      placeholder={this.props.user.username}
                      onChange={this.onChangeUsername}
                      required
                      />
                </div>
                <div>
                  <label>Firstname: </label>
                  <Input type="text"
                      placeholder={this.props.user.name}
                      onChange={this.onChangeName}
                      required
                      />
                </div>
                <div>
                  <label>Lastname: </label>
                  <Input type="text"
                      placeholder={this.props.user.familyName}
                      onChange={this.onChangeFamilyName}
                      required
                      />
                </div>
                <div>
                  <label>DOB: </label>
                  <Input type="text"
                      placeholder={this.props.user.dob}
                      onChange={this.onChangeDOB}
                      required
                      />
                </div>
                </Form>
              </div>
              </ModalBody>

              <ModalFooter>
              <button type="button" class="btn btn-info" data-dismiss="modal" onClick={this.onSubmit}>Update</button>
              <button type="button" class="btn btn-danger" onClick={this.props.onHide}>Cancel</button>
              </ModalFooter>
          </Modal>
        );

    }
}

export default UserUpdateModal;

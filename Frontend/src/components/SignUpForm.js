/**
 * User SignUp/LogIn Page
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Xiaoxuan Li - ID: 933206, Sep 4, 2019
 **/
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Input, FormFeedback, Alert, Spinner } from "reactstrap";
import axios from 'axios';

class SignUpForm extends Component {
    constructor(props){
      super(props);

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeFamilyName = this.onChangeFamilyName.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeDOB = this.onChangeDOB.bind(this);
      this.onChangeLocation = this.onChangeLocation.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeDateJoined = this.onChangeDateJoined.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.validateEmail = this.validateEmail.bind(this);
      this.validatePassword = this.validatePassword.bind(this);

      this.state ={
        name:'',
        familyName:'',
        username:'',
        email:'',
        dob:'',
        password:'',
        dateJoined:'',
        touched: {
          email: false,
          password: false
        },
        validate: {
          emailState: "",
          passwordState: "",
          create: "",
        }
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
    onChangeEmail(e){
      this.setState({
        email: e.target.value
      });
    }
    onChangeDOB(e){
      this.setState({
        dob: e.target.value
      });
    }
    onChangeLocation(e){
      this.setState({
        location: e.target.value
      });
    }
    onChangePassword(e){
      this.setState({
        password: e.target.value
      });
    }
    onChangeDateJoined(e){
      this.setState({
        dateJoined: e.target.value
      });
    }

    handleBlur = e => {
      const field = e.target.name;
      this.setState({ touched: { [field]: true } });
      field === "email" ? this.validateEmail(e) : this.validatePassword(e);
    };

    validateEmail = e => {
  		this.setState({ [e.target.name]: e.target.value });

  		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		const { validate } = this.state;
  		if (e.target.value.length < 1) {
  			validate.emailState = "";
  		} else if (emailRex.test(e.target.value)) {
  			validate.emailState = "has-success";
  		} else {
  			validate.emailState = "has-danger";
  		}
  		this.setState({ validate });
  	};

  	validatePassword = e => {
  		this.setState({ [e.target.name]: e.target.value });
  		const { validate } = this.state;
  		if (e.target.value.length < 1) {
  			validate.passwordState = "";
  		} else if (e.target.value.length < 6) {
  			validate.passwordState = "has-danger";
  		} else {
  			validate.passwordState = "has-success";
  		}
  		this.setState({ validate });
  	};


    onSubmit(e){

      var data_url;
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code
        data_url = "http://localhost:6100";
      } else {
        // production code
        data_url = "https://pair-looms.herokuapp.com";
      }      

      let {validate} = this.state;

      e.preventDefault();

      const newUser = {
        name: this.state.name,
        familyName: this.state.familyName,
        username: this.state.username,
        email: this.state.email,
        dob: this.state.dob,
        password: this.state.password,
        dateJoined: this.state.dateJoined
      }

    if(this.state.validate.passwordState === "has-success"){
      axios.post(data_url + '/user/add', newUser)
      .then(() => {validate.create = "has-success"; this.setState({validate: validate});})
      .catch(err => {
        const { status } = err.response;
        if (status === 422){
          validate.create = "has-fail";
          this.setState({validate: validate});
        }
        else{
          validate.create = "has-error";
          this.setState({validate: validate});
        }
      })
    }

  }



    render(){
        return(
          <div className="FormCenter">
            <Form onSubmit={this.onSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label">Username: </label>
                <Input type="text" required className="FormField__Input"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">First Name: </label>
                <Input type="text" id="name" className="FormField__Input"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
              </div>
              <div className="FormField">
                <label className="FormField__Label">Family Name: </label>
                <Input
                    type="text" className="FormField__Input"
                    required
                    value={this.state.familyName}
                    onChange={this.onChangeFamilyName}
                    />
              </div>
              <div className="FormField">
                <label className="FormField__Label">Email: </label>
                <Input type="email" id="email" name="email"
                className="FormField__Input" onBlur={this.handleBlur} onChange={this.onChangeEmail}
                    required
                    value={this.state.email}
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}/>
                    <FormFeedback valid>Looking good!</FormFeedback>
    								<FormFeedback invalid>Please enter a valid email</FormFeedback>
              </div>
              <div className="FormField">
                <label className="FormField__Label">Date of Birth: </label>
                <Input
                    type="text"
                    required
                    className="FormField__Input"
                    value={this.state.dob}
                    onChange={this.onChangeDOB}
                    placeholder="DD/MM/YY"
                    />
              </div>
              <div className="FormField">
                <label className="FormField__Label">Password: </label>
                <Input type="password" id="password" name="password"
                    required
                    className="FormField__Input"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    onBlur={this.handleBlur}
                    valid={this.state.validate.passwordState === "has-success"}
                    invalid={this.state.validate.passwordState === "has-danger"}
                    />
                    <FormFeedback valid>Looking good!</FormFeedback>
    								<FormFeedback invalid>Password must have at least 6 characters</FormFeedback>
              </div>
              <div className="FormField">
                <input type="submit" value="Create New Account" className="FormField__Button mr-20" />
              </div>

              <Alert color="danger" isOpen={this.state.validate.create === "has-fail"}>
								Sign up failed, try again...
							</Alert>

              <Alert color="primary" isOpen={this.state.validate.create === "has-success"}>
								Account created successfully! You can sign-in now.
							</Alert>

              <Alert color="danger" isOpen={this.state.validate.create === "has-error"}>
								Sorry, there was an error creating account. Try again later!
							</Alert>

            </Form>
          </div>
        );
    }
}

export default SignUpForm;

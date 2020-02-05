/**
 * User Login Modal
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Xiaoxuan Li - ID: 933206, Sep 21, 2019
 **/

import axios from "axios";
import React, { Component } from 'react';
import { Form, Input, FormFeedback, Alert, Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class SignInForm extends Component{

  state = {
    modal: false,
    email: "",
    password: "",
    validate: {
      emailState: "",
      passwordState: "",
      login: "",
    },
    touched: {
      email: false,
      password: false
    },
    showSpinner: false
  };

  resetFields = () => {
		this.setState({
			email: "",
			password: "",
			validate: {
				emailState: "",
				passwordState: "",
				login: ""
			},
			touched: {
				email: false,
				password: false
			},
			showSpinner: false
		});
	}

  onSubmit = e => {
		e.preventDefault();

		// validate!
		let {validate} = this.state;
		if (validate.emailState !== "has-success" || validate.passwordState !== "has-success") {
			return;
		}

		// start submission
		this.setState({ showSpinner: true });

		var data_url;
		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
			// dev code
			data_url = "http://localhost:6100/user/login";
		} else {
			// production code
			data_url = "https://pair-looms.herokuapp.com/user/login";
		}


		axios
			.post(data_url, {
        "user":{
				email: this.state.email.toLowerCase(),
				password: this.state.password}
			})
			.then(response => {
				if (response.data.user) {
					// update ui
					this.setState({ showSpinner: false });
					validate.login = "has-success";
					this.setState({validate: validate});

					// actually process login
					setTimeout(() => {
						this.props.loginCallBackFromParent(response.data.user);

					}, 1000);
          console.log(response.data.user);
				} else {
					// update ui
					this.setState({ showSpinner: false });
					validate.login = "has-error";
					this.setState({validate: validate});
          //// DEBUG:
          console.log(response);
				}
			}).catch(err => {
				const { status } = err.response;

				if (status === 401) {
					// update ui
					this.setState({ showSpinner: false });
					validate.login = "has-fail";
					this.setState({validate: validate});
				}
				else {
					// update ui
					this.setState({ showSpinner: false });
					validate.login = "has-error";
					this.setState({validate: validate});
          console.log(err);
				}
			});
	};

	onChange = e => {
		// if user input is bad on blur, give immediate feedback when it comes good
		const field = e.target.name;
		if (field === "email" && this.state.validate.emailState !== "") {
			this.validateEmail(e);
		}
		if (field === "password" && this.state.validate.passwordState !== "") {
			this.validatePassword(e);
		}
	};

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

	render() {
		return (
      <div className="FormCenter">
            <Form onSubmit={this.onSubmit} className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Email Address</label>
                <Input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email"
                onChange={this.handleChange} onBlur={this.handleBlur} required
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}/>
                <FormFeedback valid>Looking good!</FormFeedback>
								<FormFeedback invalid>Enter a valid email</FormFeedback>
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <Input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"
                onChange={this.handleChange} onBlur={this.handleBlur} required
                valid={this.state.validate.passwordState === "has-success"}
                invalid={this.state.validate.passwordState === "has-danger"}/>
                <FormFeedback valid>Looking good!</FormFeedback>
								<FormFeedback invalid>Password must have at least 6 characters</FormFeedback>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button>
              </div>

              <Alert color="danger" isOpen={this.state.validate.login === "has-fail"}>
								Password/Email incorrect, try again...
							</Alert>

							<Alert color="primary" isOpen={this.state.validate.login === "has-success"}>
								Login successful! Have fun :)
							</Alert>

							<Alert color="danger" isOpen={this.state.validate.login === "has-error"}>
								Sorry, there was an error logging in. Try again later!
							</Alert>

							{this.state.showSpinner && (
								<center>
									<Spinner color="success" />
								</center>
							)}
            </Form>
          </div>
		);
	}
}

export default SignInForm;

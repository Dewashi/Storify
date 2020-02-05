import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './Cover.css';
import CoverPaint from './Val-paint.PNG';

class CoverPage extends Component {

  loginCallBack = user => {
    this.props.handleLogin(user);
    this.props.history.push('/Home');
	};


  render(){
    return(
      <Router>
          <div className="Cover">
            <div className="App__Aside">
            <img src={CoverPaint} className="AsideImage" alt="CoverPage Paint"/>
            </div>
            <div className="App__Form">
              <div className="PageSwitcher">
                  <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                  <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div>

                <div className="FormTitle">
                    <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                </div>

                <Route exact path="/" component={SignUpForm}>
                </Route>

                <Route path={"/sign-in"} render={props => (
                  <SignInForm {...props}
        					loginCallBackFromParent={this.loginCallBack}/>
                  )}
                />

            </div>

          </div>
        </Router>
    );
  }

}
export default CoverPage;

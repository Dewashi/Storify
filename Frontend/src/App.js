import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, BrowserRouter as Router, Route, withRouter} from "react-router-dom";

import Home from './components/Home';
import CoverPage from "./components/CoverPage";
import Profile from "./components/Profile";
import ArtifactDetail from "./components/ArtifactDetail";

//import HeirloomForm from "./components/HeirloomForm";
//import ModalForm from "./components/Modalform";


class App extends Component {
  /*Modified by Xiaoxuan Li for user authentication, 2019 Oct 1*/
  state = {
		isAuthenticated: false,
      user: {
      _id: "",
			username: "",
      name: "",
      familyName: "",
      email: "",
      dob: ""
		},
    artifactID:JSON.parse(localStorage.getItem('artifactID')) || [],
	};

  handleLogin = user => {
		this.setState({
			isAuthenticated: true,
            user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        familyName: user.familyName,
        email: user.email,
        dob: user.dob,
        imageReference: user.imageReference
      }
		},()=>{localStorage.setItem('user', JSON.stringify(this.state.user))});

	};

  handleClick = id =>{
    this.setState({
      artifactID:id
    },()=>{localStorage.setItem('artifactID', JSON.stringify(this.state.artifactID))});
    window.location="/ArtifactDetail"
  }

render(){
  return(
    <div className="App">
      <Router>
        <Switch>
        <Route exact path={"/"}
        render={props => (
          <CoverPage {...props}
          handleLogin={this.handleLogin}/>
          )}
        />

        <Route exact path={"/Home"}
        render={props => (
          <Home {...props}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          handleLogin={this.handleLogin}
          handleClick ={this.handleClick} />
          )}
        />
        <Route exact path={"/Profile"}
        render={props => (
          <Profile {...props}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}/>
          )}
        />
        <Route exact path={"/ArtifactDetail"}
       render={props => (
         <ArtifactDetail {...props}
         isAuthenticated={this.state.isAuthenticated}
         user={this.state.user}
         artifactId={this.state.artifactID}/>
         )}
       />

        </Switch>
      </Router>
    </div>
    );
  }
}

export default withRouter(App);

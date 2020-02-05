import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Usericon from './usericon.PNG';
import Switch from "./Logout.PNG";
import './Home.css';
import axios from "axios";
import ArtifactList from './ArtifactList';
class Home extends Component {

    navigateToProfile=()=>{
      window.location='/Profile';
    }

    stay=()=>{
      window.location='/Home';
    }

    logout=()=>{
      window.location='/';
    }

    render(){
        return(
          <Router>
          <div className="home">
          <Route path={"/Home"} render={props => (
                <ArtifactList {...props} handleClick={this.props.handleClick}/>
            )} />
          </div>
        </Router>
        );
    }
}

export default Home;

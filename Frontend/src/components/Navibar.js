import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import user_icon from "./user_icon.png";
import "./Navibar.css";
import {UserModal} from './UserModal';

class Navibar extends Component {
    render(){
        return(
          <nav className="navbar">
          <div>
            <a className="navbar-brand" href="#">Shanmuganathan Registry</a>
            <a className="navbar-brand" href="##">
              <img className="user_icon" src={user_icon} width="40" height="40" alt="/Profile"  />
            </a>
          </div>
          </nav>
        );
    }
}

export default Navibar;

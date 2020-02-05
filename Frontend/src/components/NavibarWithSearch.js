/**
 * Navibar with a seacrch form
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Xiaoxuan Li - ID: 933206, Sep 11, 2019
 * Modified Sep 22, 2019
 **/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import { Collapse, NavbarToggler } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import user_icon from "./user_icon.png";
import "./Navibar.css";
import Home from './Home';
import CoverPage from './CoverPage';

class NavibarWithSearch extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      addModalShow: false
    }
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  navigate(){
    this.props.history.push('/Home');
  }

    render(){
      let addModalClose=()=> this.setState({addModalShow: false});
        return(
              <div className="navbar">
                <nav>
                {/*<NavbarToggler onClick={this.toggle} />*/}
                <NavLink onClick={this.props.navigate} className="navbar-brand" >Shanmuganathan Registry</NavLink>
                <Collapse isOpen = {this.state.isOpen} navbar>
                <form className="form-inline" >
                <input className="form-control mr-sm-2" type="search" placeholder="Search Artifacts" aria-label="Search" />
                <button className="btn btn-outline-info" type="submit" style={{color:"white"}} >Search</button>
                </form>
                </Collapse>
                {/*<img className="user_icon" src={user_icon} width="40" height="40" alt="Profile"
                onClick = {()=> this.setState({addModalShow: true})} />
                <LoginModal show={this.state.addModalShow} onHide={addModalClose}/>*/}
                </nav>
            </div>
        );
    }
}

export default NavibarWithSearch;

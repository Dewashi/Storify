/**
 * Artifact List Page
 * INCOMPLETE
 * Created for IT PROJECT 2019
 * Group : Odin's Army
 * Initial commit/file creation by Xiaoxuan Li - ID: 933206, Sep 21, 2019
 * Modified by Tehara Moonemalle - ID: 879459, October 12, 2019
 **/


import React, { Component, Fragment } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import Usericon from './usericon.PNG';
import Switch from "./Logout.PNG";
import './ArtifactList.css';
import FilterPool from './FilterPool';
import axios from "axios";
import ReactDOM from 'react-dom';
import Artifact from './Artifact';
import LogoutModal from './LogoutModal';

class ArtifactList extends Component {
    state = {
		artifacts: [],
    tag: "",
    input:"",
    showModal: false
	};

  navigateToProfile=()=>{
    window.location='/Profile';
  }

  stay=()=>{
    window.location='/Home';
  }

  logout=()=>{
    window.location='/';
  }

  onSubmit= e =>{
    e.preventDefault();

    var data_url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      data_url = "http://localhost:6100/artifact/searchTitle/"+this.state.input;
    } else {
      // production code
      data_url = "https://pair-looms.herokuapp.com/artifact/searchTitle/"+this.state.input;
    }

    axios.get(data_url)
    .then(response => {this.setState({artifacts: response.data.artifact})
    console.log("Hereee\n", {artifacts: response.data.artifact})

    console.log(this.state);
  })
  }

  onChangeInput= e =>{
    this.setState({
      input: e.target.value
    });
  }

    updateTag=tag=>{
      this.setState({tag:tag});
      var data_url;
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // dev code
        data_url = "http://localhost:6100/artifact/searchType/"+tag;
      } else {
        // production code
        data_url = "https://pair-looms.herokuapp.com/artifact/searchType/"+tag;
      }

      axios.get(data_url)
      .then(response => {this.setState({artifacts: response.data.artifact})
      console.log("Hereee\n", {artifacts: response.data.artifact})

      console.log(this.state);
    })
  }

    async componentDidMount() {
      console.log(this.state);
        var data_url;
    		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    			// dev code
    			data_url = "http://localhost:6100/artifact/searchAll";
    		} else {
    			// production code
    			data_url = "https://pair-looms.herokuapp.com/artifact/searchAll";
    		}

        await axios.get(data_url)
        .then(response => {
            this.setState({artifacts: response.data.artifact})
            console.log("Hereee\n", {artifacts: response.data.artifact});
            //const title = this.state[0].title;
            //const imageReference = this.state[0].imageReference;

        },
            err => console.log("Failed to load.\n", err)
          );
          console.log(this.state);

    }

    render() {
      let logoutModalClose = () =>{ this.setState({showModal:false})}
      if(!this.state.artifacts.length){
        return(
          <div class="container">
            <div className="navbar">
              <NavLink onClick={this.stay} className="navbar-brand" >Shanmuganathan Registry</NavLink>
              <form className="form-inline" onSubmit={this.onSubmit}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search Artifacts" aria-label="Search"
              onChange={this.onChangeInput}/>
              <button className="btn btn-outline-info" type="submit" style={{color:"white"}} >Search</button>
              </form>
              <img className="Usericon" src={Usericon} width="100vh" height="50vh" alt="Profile"
              onClick = {this.navigateToProfile} />
              <img className="Logout" src={Switch} width="45px" height="38px" alt="Logout-Button"
              onClick = {()=>{this.setState({showModal:true})}} />
           </div>

           <div className="container">
            <p>
              Sorry, nothing found in database.
            </p>
           </div>
           <div className="FilterPool">
             <FilterPool updateTag={this.updateTag}/>
           </div>
           <div>
             <LogoutModal onHide={logoutModalClose} show={this.state.showModal} Logout={this.logout}/>
           </div>
          </div>
        )
      }

      else{
        return(
          <div class="container">
            <div className="navbar">
              <NavLink onClick={this.stay} className="navbar-brand" >Shanmuganathan Registry</NavLink>
              <form className="form-inline" onSubmit={this.onSubmit}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search Artifacts" aria-label="Search"
              onChange={this.onChangeInput}/>
              <button className="btn btn-outline-info" type="submit" style={{color:"white"}} >Search</button>
              </form>
              <img className="Usericon" src={Usericon} width="100vh" height="50vh" alt="Profile"
              onClick = {this.navigateToProfile} />
              <img className="Logout" src={Switch} width="45px" height="38px" alt="Logout-Button"
              onClick = {()=>{this.setState({showModal:true})}} />
           </div>

            <div className="ArtifactList">
            {
                this.state.artifacts.map((artifact) => (
                    <Artifact
                        key={artifact._id}
                        artifact={artifact}
                        handleClick={this.props.handleClick}
                        />
                    ))
                }
              </div>
              <div className="FilterPool">
                <FilterPool updateTag={this.updateTag}/>
              </div>
              <div>
                <LogoutModal onHide={logoutModalClose} show={this.state.showModal} Logout={this.logout}/>
              </div>
              </div>
            );
        }
    }
  }

export default ArtifactList;

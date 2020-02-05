import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class Update extends Component {
    render(){
        return(
          <div className="card bg-light mb-3" style={{height:300}}>
            <div className="card-header">Update</div>
              <div className="card-body">
                <p className="card-text">Some updates will show up here</p>
              </div>
            </div>
        );
    }
}

export default Update;

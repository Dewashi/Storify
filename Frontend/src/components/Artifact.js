import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';


import './Artifact.css';
import Sample from './sample artifact.jpeg';
import FilterPool from './FilterPool';
import Update from './Update';

class Artifact extends Component {
    render() {
        const {artifact} = this.props;

        return(
            <div className="container">
              <div class="card">
                 <div class="card__image-container">
                   <img class="card__image" src={artifact.imageReference[0]} alt=""/>
                </div>

                  <svg class="card__svg" viewBox="0 0 80 500">
                  </svg>

                 <div class="card__content">
                   <h1 class="card__title">{artifact.title}</h1>
                   <h1 className="card-space1"> </h1>
                       <span className="badge badge-pill badge-info">{artifact.tags.primary}</span>
                   <h1 className="card-space2"> </h1>
                     <p><TextTruncate
                            className="card-text"
                            text={artifact.description}
                            line={3}
                            element="div"
                            truncateText="..."
                      /></p>
                      <h1 className="card-space3"> </h1>
                      <button className="btn btn-outline-info" onClick={()=>this.props.handleClick(artifact._id)}>Details</button>
                </div>
              </div>
            </div>
        );
    }
}


export default Artifact;

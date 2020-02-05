import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Filters.css';

class FilterPool extends Component {
    render(){
        return(
            <div className="filter-container">
        			<div className="card-header">
                FILTERS
              </div>
              <div className="card-body">
                <button type="button" class="button" onClick={()=>this.props.updateTag("Book")}>Book</button>
                <button type="button" class="button" onClick={()=>this.props.updateTag("Jewellery")}>Jewellery</button>
                <button type="button" class="button" onClick={()=>this.props.updateTag("Painting")}>Painting</button>
                <button type="button" class="button" onClick={()=>this.props.updateTag("Furniture")}>Furniture</button>
                <button type="button" class="button" onClick={()=>this.props.updateTag("Picture")}>Picture</button>
                <button type="button" class="button" onClick={()=>this.props.updateTag("Other")}>Other</button>
              </div>


        		</div>

        );
    }
}

export default FilterPool;

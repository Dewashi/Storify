//Odin Wong
//based on https://medium.com/@jerrylowm/build-a-tags-input-react-component-from-scratch-1524f02acb9a

import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";


class TagInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.subtags
        }


        //callback function to notify parent of changes in the tags list
        this.handTagsFunction = props.handTagsFunction
    }

    componentDidUpdate(prevProps) {
        if (prevProps.subtags.length !== this.props.subtags.length) {
            this.setState({ tags: this.props.subtags })
        }
    }

    //removes a tag from the list
    removeTag = (i) => {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.handTagsFunction( newTags )
    }



    inputKeyDown = (e) => {
        const val = e.target.value;
        //pressed enter on input and has contents
        if (e.key === 'Enter' && val) {
            //if duplicate
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.handTagsFunction( [...this.state.tags, val] )
            this.tagInput.value = null;
        }
        //remove last tag if backspace pressed in empty input
        else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    }

    render() {
        const {tags}  = this.state;

        return (
            <div className="d-block bg-white p-2" style={{ border: "1px solid LightGrey", borderRadius:"5px" }}>
                <ul className="list-inline">
                    {tags.map((tag, i) => (
                        <li key={tag} className="list-inline-item">
                            {tag}
                            <button type="button" className="btn" onClick={() => { this.removeTag(i); }}>x</button>
                        </li>
                    ))}
                    <li className="list-inline-item"><input type="text" placeholder="Enter" on style={{ border: "0px white" }} onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                </ul>
            </div>
        );
    }
}

export default TagInput

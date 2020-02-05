//Odin Wong
//recursive comment tree component

import React from "react"
import Axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";

class CommentTree extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Id: "",
            text: "",
            userId: "",
            username: "",
            datePosted: "",
            artifactId: "",
            children: [],
            others: [],
            displayReply: false
        }

        this.commentSubmit = this.commentSubmit.bind(this)

        //----------api url to be changed--------------//
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
             // dev code
            this.ApiURL = "http://localhost:6100"
        } else {
            // production code
            this.ApiURL = "https://pair-looms.herokuapp.com"
        }

    }

    componentDidMount() {

        this.setState({
            Id: this.props.self._id,
            text: this.props.self.text,
            userId: this.props.self.userId,
            username: this.props.self.username,
            artifactId: this.props.self.artifactId,
            datePosted: this.props.datePosted

        }, () => {

				Axios.get(this.ApiURL + "/user/" + this.state.userId)
					.then(res => {
						this.setState({
							userpic: res.data.user.imageReference
						})
					})

                //separate direct children
                const children = this.props.subComments.filter(c => c.parentId === this.state.Id)
                const others = this.props.subComments.filter(sub => (!(children.includes(sub))))

                this.setState({
                    children: children,
                    others: others
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.subComments !== prevProps.subComments) {
            const children = this.prevProps.subComments.filter(c => c.parentId === this.state.Id)
            const others = this.prevProps.subComments.filter(sub => (!(children.includes(sub))))

            this.setState({
                children: children,
                others: others
            })
        }
    }



    //submit a comment
    commentSubmit(event) {
        event.preventDefault()
        const newComment = event.target.comment.value
        event.target.reset()

        const comment = {
            userId: JSON.parse(localStorage.getItem("user"))._id,
            artifactId: this.state.artifactId,
            username: JSON.parse(localStorage.getItem("user")).username,
            text: newComment,
            datePosted: Date(),
            parentId: this.state.Id
        }


        Axios.post(this.ApiURL + "/comment/create/" + this.state.artifactId + "/" + this.state.userId, comment)
            .then(res => {
                //add the new comment to the array
                if (res.data.parentId === this.state.Id) {
                    this.setState({ children: this.state.children.concat(res.data) }, () => console.log(this.state.comments))
                } else {
                    this.setState({ others: this.state.others.push(res.data) })
                }
            })
            .catch(err => console.log(err.response))

    }

    //renders a input box to reply to the comment
    renderReplyBox() {
        return (
            <form className="form" autocomplete="off" onSubmit={this.commentSubmit}>
                <div className="form-row">
                    <div className="col-10">
                        <textarea name="comment" className="form-control" rows="1" style={{ resize: "none"}} placeholder="Reply" />
                    </div>
                    <div className="col-auto">
                        <button class="btn btn-outline-secondary" className="form-control" type="submit" value="submit">Post</button>
                    </div>
                </div>
            </form>
            )
    }

    toggleDisplayReply = () => {
        console.log("toggled")
        this.setState({displayReply: true})
    }

    render() {
        return (
            <div className="m-2" style={{border:"solid 3px"}}>
                <div className="d-flex justify-content-end border bg-secondary">
                    <img style={{maxHeight:"50px", width:"auto"}} src={this.state.userpic} />
                    <div className="p-2" >{this.state.username}</div>
                </div>
                <div className="bg-white p-2"><p> {this.state.text} </p></div>

                {/*reply to this comment*/}
                {this.state.displayReply ? this.renderReplyBox() : <button className="m-2 btn-sm btn-outline-secondary" onClick={this.toggleDisplayReply} >Reply</button>}

                {this.state.children.map(c => <CommentTree self={c} key={c.id} subComments={this.state.others} />)}
            </div>
        )

    }


}

export default CommentTree

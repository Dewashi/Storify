//Tehara Moonemalle
//wrapper to make an element modal, particularly for forms
//adapted from reactstrap documentation https://reactstrap.github.io/components/modals/


import React from "react"
import HeirloomForm from "./HeirloomForm"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SuccessModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
         this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {

        return (
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Successful!</h5>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Sign in successful </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default SuccessModal;

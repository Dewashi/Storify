//created by Tehara Moonemalle, modified by Xiaoxuan li
//wrapper to make an element modal, particularly for forms
//adapted from reactstrap documentation https://reactstrap.github.io/components/modals/


import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LogoutModal extends React.Component {
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
          <Modal class="modal" tabindex="-1" isOpen={this.props.show}>
              <ModalHeader>
                Are you sure you want to Logout?
              </ModalHeader>
              <ModalFooter>
                <button type="button" class="btn btn-info" data-dismiss="modal" onClick={this.props.onHide}>Cancel</button>
                <button type="button" class="btn btn-danger" onClick={this.props.Logout}>Yes, Logout</button>
              </ModalFooter>
          </Modal>
        );

    }
}

export default LogoutModal;

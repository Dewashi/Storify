//Odin Wong
//wrapper to make an element modal, particularly for forms
//adapted from reactstrap documentation https://reactstrap.github.io/components/modals/


import React from "react"
import HeirloomForm from "./HeirloomForm"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalForm extends React.Component {
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
            <div>
                <Button className="btn" onClick={this.toggle}>Add Artifact</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
                    <ModalHeader toggle={this.toggle}>Add Artifact</ModalHeader>
                    <ModalBody>
                        <HeirloomForm/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}

export default ModalForm;

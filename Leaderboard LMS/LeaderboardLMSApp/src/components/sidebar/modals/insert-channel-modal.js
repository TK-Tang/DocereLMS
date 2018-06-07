import React from "react";
import {Modal, Button, Label, Form, Menu} from "semantic-ui-react";

export default class InsertChannelModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
            description: "",
            adminChannelOnly: false,
            viewChannelOnly: false,
        }
    }

    openModal = () => {
        this.setState({modal: true});
        this.setState({successMessage: ""});
        this.setState({errorMessage: ""});
    };

    closeModal = () => this.setState({modal: false});

    setErrorMessage(m){
        this.setState({successMessage: ""});
        this.setState({errorMessage: m});
    }

    setSuccessMessage(m){
        this.setState({successMessage: m});
        this.setState({errorMessage: ""});
    }

    updateName(e){
        this.setState({name: e.target.value});
    }

    updateDescription(e){
        this.setState({description: e.target.value});
    }

    updateAdminChannelOnly(e){
        this.setState({adminChannelOnly: e.target.value});
    }

    updateViewChannelOnly(e){
        this.setState({viewChannel: e.target.value});
    }

    render(){
        return (
            <Modal
                onClose={this.closeModal}
                closeIcon
                size="small"
                open={this.state.modal}
                trigger={<Menu.Item className="leaderboard-menu" onClick={this.openModal}># add chat</Menu.Item>}
            >
            <Modal.Header>
                    Create New Channel
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={4} label="Name:" onChange={this.updateName.bind(this)} value={this.state.name} placeholder="Name of your new channel"/>
                                <Form.Input width={12} label="Description:" onChange={this.updateDescription.bind(this)} value={this.state.description} placeholder="Description of the channel"/>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""} 
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    <Button primary>Create</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
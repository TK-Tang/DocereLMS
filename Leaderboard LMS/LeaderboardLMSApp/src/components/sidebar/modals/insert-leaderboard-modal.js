import React from "react";
import {Modal, Button, Image, Label, Form, Input, Icon, Menu} from "semantic-ui-react";

import CourseAPI from "../../../services/leaderboard-api";

export default class InsertLeaderboardModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
            blurb: "",
            weighting: 0
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    updateName(e){
        this.setState({name: e.target.value});
    }

    updateBlurb(e){
        this.setState({blurb: e.target.value});
    }

    updateWeighting(e){
        this.setState({weighting: e.target.value});
    }

    insertLeaderboard(){
        if(!this.state.name){
            this.setState({errorMessage: "Your leaderboard needs a name"});
        }
    }

    render(){
        return (
            <Modal
                onClose={this.closeModal}
                closeIcon
                size="small"
                open={this.state.modal}
                trigger={<Menu.Item className="leaderboard-menu" onClick={this.openModal}><i>Add Leaderboard</i></Menu.Item>}
            >
                <Modal.Header>
                    Create New Leaderboard
                </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={13} label="Name:" onChange={this.updateName.bind(this)} value={this.state.name} placeholder="Name of your new leaderboard/assessment"/>
                                <Form.Input width={3} label="Weighting:" onChange={this.updateWeighting.bind(this)} value={this.state.weighting} placeholder="Weighting of the assessment"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea width={16} label="Blurb:" rows="7" onChange={this.updateBlurb.bind(this)} value={this.state.blurb} placeholder="Description of your new leaderboard" />
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""} 
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    <Button primary onClick={this.insertLeaderboard.bind(this)}>Create</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
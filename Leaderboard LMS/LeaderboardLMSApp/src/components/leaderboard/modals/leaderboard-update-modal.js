import React from "react";
import {Modal, Button, Image, Label, Form, Input, Segment, Checkbox, TextArea, Icon} from "semantic-ui-react";

import LeaderboardAPI from "../../../services/leaderboard-api";

export default class LeaderboardUpdateModal extends React.Component {
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

    componentWillMount(){
        this.setState({name: this.props.leaderboard.name});
        this.setState({blurb: this.props.leaderboard.blurb});
        this.setState({weighting: this.props.leaderboard.weighting});
    }

    updateLeaderboard(){

    }

    render(){
        return (
            <Modal
                closeIcon
                onClose={this.closeModa}
                size="small"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button onClick={this.openModal}><Icon name="edit"/> Edit Leaderboard</Button>}
            >
                <Modal.Header>
                    Update Leaderboard
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Segment>
                            <Form>
                                <Form.Group>
                                    <Form.Input width={14} label="Name:" onChange={this.updateName.bind(this)} value={this.state.name} />
                                    <Form.Input width={2} label="Weighting:" onChange={this.updateWeighting.bind(this)} value={this.state.weighting} />
                                </Form.Group>
                                <Form.Field>
                                    <Label>Blurb:</Label>
                                    <TextArea onChange={this.updateBlurb.bind(this)} value={this.state.blurb} />
                                </Form.Field>
                                <Form.Field width="2">
                                   
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.updateLeaderboard}>Save</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
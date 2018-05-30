import React from "react";
import {Modal, Button, Label, Form, Segment, TextArea, Icon} from "semantic-ui-react";

import LeaderboardAPI from "../../../services/leaderboard-api";

export default class LeaderboardUpdateModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            leaderboard_id: 0,
            name: "",
            blurb: "",
            weighting: 0
        }
    }

    openModal = () => this.setState({modal: true});

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

    updateBlurb(e){
        this.setState({blurb: e.target.value});
    }

    updateWeighting(e){
        this.setState({weighting: e.target.value});
    }

    componentWillMount(){
        this.setState({leaderboard_id: this.props.leaderboard.id});
        this.setState({name: this.props.leaderboard.name});
        this.setState({blurb: this.props.leaderboard.blurb});
        this.setState({weighting: this.props.leaderboard.weighting});
    }

    updateLeaderboard(){

        if(!this.state.name){
            this.setState({errorMessage: "Your leaderboard needs a name"});
            return;
        }

        let leaderboardInfo = {
            name: this.state.name,
            blurb: this.state.blurb,
            weighting: this.state.weighting
        };

        LeaderboardAPI.post_leaderboard(this.props.course_id, this.state.leaderboard_id, leaderboardInfo).then((res) => {
            if (res.status === "success"){
                this.setSuccessMessage(res.message);
                this.props.retrieveLeaderboard(this.props.course_id, this.state.leaderboard_id);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render(){
        return (
            <Modal
                closeIcon
                onClose={this.closeModal}
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
                    <Button primary onClick={this.updateLeaderboard.bind(this)}>Save</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
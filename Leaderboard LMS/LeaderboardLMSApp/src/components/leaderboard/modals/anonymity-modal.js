import React from "react";
import {Modal, Button, Icon, Grid, Label} from "semantic-ui-react";

import AnonymityAPI from "../../../services/student-anonymity-settings-api";

export default class AnonymityModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            revealLeaderboardName: false,
            revealRankingSections: false,
            errorMessage: "",
            successMessage: ""
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

    componentWillMount(){
        this.setState({revealLeaderboardName: this.props.Anonymity.revealLeaderboardName});
        this.setState({revealRankingSections: this.props.Anonymity.revealRankingSections});
    }

    componentWillReceiveProps(newProps){
        this.setState({revealLeaderboardName: newProps.Anonymity.revealLeaderboardName});
        this.setState({revealRankingSections: newProps.Anonymity.revealRankingSections});
    }

    revealLeaderboardNameTrue(){
        this.setState({revealLeaderboardName: true});
    }

    revealLeaderboardNameFalse(){
        this.setState({revealLeaderboardName: false});
    }

    revealRankingSectionsTrue(){
        this.setState({revealRankingSections: true});
    }

    revealRankingSectionsFalse(){
        this.setState({revealRankingSections: false});
    }

    save(){
        let studentAnonymitySettingsInfo = {
            revealLeaderboardName: this.state.revealLeaderboardName,
            revealRankingSections: this.state.revealRankingSections
        };

        AnonymityAPI.post_studentAnonymitySettings(this.props.course_id, this.props.ranking_id, studentAnonymitySettingsInfo).then((res) => {
            if (res.status === "success"){
                this.setSuccessMessage(res.message);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render() {
        return(
            <Modal
                onClose={this.closeModal}
                size="tiny"
                open={this.state.modal}
                trigger={
                    <Icon name="hide" className="icon-blue teal-hover cursor-pointer" size="large" onClick={this.openModal}/>
                }
            >
                <Modal.Header>Anonymity Settings</Modal.Header>
                <Modal.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={2} />
                            <Grid.Column width={14} >
                                <Button.Group>
                                    <Button style={{width: "210px"}}>Reveal Leaderboard Name</Button>
                                    <Button color={this.state.revealLeaderboardName ? "teal" : "grey"} onClick={this.revealLeaderboardNameTrue.bind(this)} >Public</Button>
                                    <Button color={!this.state.revealLeaderboardName ? "teal" : "grey"} onClick={this.revealLeaderboardNameFalse.bind(this)} >Private</Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2} />
                            <Grid.Column width={14} >
                                <Button.Group>
                                    <Button style={{width: "210px"}}>Reveal Ranking Sections</Button>
                                    <Button color={this.state.revealRankingSections ? "teal" : "grey"} onClick={this.revealRankingSectionsTrue.bind(this)} >Public</Button>
                                    <Button color={!this.state.revealRankingSections ? "teal" : "grey"} onClick={this.revealRankingSectionsFalse.bind(this)} >Private</Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
               
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button onClick={this.save.bind(this)} primary>Save</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
import React from "react";
import {Form, Button, Icon, Modal, Label, TextArea} from "semantic-ui-react";

import RankingAPI from "../../../services/ranking-api";

export default class UpdateRankingModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            note: "",
            mark: ""
        }
    }

    componentWillMount(){
        if(!this.props.course_id){ return; }
        this.setState({note: this.props.ranking.note});
        this.setState({mark: this.props.ranking.mark});
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

    updateNote(e){
        this.setState({note: e.target.value});
    }

    updateMark(e){
        this.setState({mark: e.target.value});
    }

    updateRanking(){
        if(!this.state.mark){
            this.setState({errorMessage: "Mark cannot be blank"});
            return;
        }

        let rankingInfo = {
            note: this.state.note,
            mark: this.state.mark
        }

        RankingAPI.post_ranking(this.props.course_id, this.props.ranking.id, rankingInfo).then((res) => {
            if(res.status === "success"){
                this.setSuccessMessage(res.message);
                setTimeout(this.props.retrieveLeaderboard(this.props.course_id, this.props.leaderboard_id), 2000);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render(){
        return(
            <Modal
                closeIcon
                onClose={this.closeModal}
                size="small"
                dimmer={true}
                open={this.state.modal}
                trigger={<Icon name="cogs" onClick={this.openModal} className="icon-blue teal-hover cursor-pointer" size="large"/>}
            >
                <Modal.Header>
                    Update Ranking
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={4} label="Mark:" onChange={this.updateMark.bind(this)} value={this.state.mark} />
                            </Form.Group>
                            <Form.Field>
                                <Label>Note:</Label>
                                <TextArea onChange={this.updateNote.bind(this)} value={this.state.note} />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" floated="left">Delete</Button>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.updateRanking.bind(this)}>Update</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
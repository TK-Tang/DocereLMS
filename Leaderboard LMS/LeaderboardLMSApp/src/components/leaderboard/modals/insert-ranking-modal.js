import React from "react";
import {Modal, Button, Label, Form, TextArea, Icon} from "semantic-ui-react";

import RankingAPI from "../../../services/ranking-api";

export default class InsertRankingModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            email: "",
            note: "",
            mark: ""
        }
    }

    componentWillMount(){
        if(!this.props.course_id){ return; }
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

    updateEmail(e){
        this.setState({email: e.target.value});
    }

    updateNote(e){
        this.setState({note: e.target.value});
    }

    updateMark(e){
        this.setState({mark: e.target.value});
    }

    insertRanking(){
        if(!this.state.email){
            this.setState({errorMessage: "Email cannot be blank"});
            return;
        }

        if(!this.state.mark){
            this.setState({errorMessage: "Mark cannot be blank"});
            return;
        }

        let rankingInfo = {
            email: this.state.email,
            note: this.state.note,
            mark: this.state.mark
        }

        RankingAPI.put_ranking(this.props.course_id, this.props.leaderboard_id, rankingInfo).then((res) => {
            if (res.status === "success"){
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
                trigger={<Button onClick={this.openModal}><Icon name="plus square outline" />Add Ranking</Button>}
            >
                <Modal.Header>
                    Add Ranking
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={12} label="Email:" onChange={this.updateEmail.bind(this)} value={this.state.email} />
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
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.insertRanking.bind(this)}>Add</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
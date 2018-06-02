import React from "react";
import {Modal, Button, Icon, Table, Form, Label} from "semantic-ui-react";

import RankingSectionAPI from "../../../services/ranking-section-api";

export default class RankingSectionEntryModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            errorMessage: "",
            successMessage: "",
            name: "",
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

    insertRankingSectionEntry(){
        let rankingSectionInfo = {
            name: this.state.name
        }
        RankingSectionAPI.put_rankingSection(this.props.course_id, this.props.leaderboard_id, rankingSectionInfo).then((res) => {
            if (res.status === "success"){
                this.setSuccessMessage(res.message);
            } else {
                this.setErrorMessage(res.message);
            }
        });
    }

    render(){
        return (
            <Modal
                onClose={this.closeModal}
                size="tiny"
                dimmer={false}
                open={this.state.modal}
                trigger={<Button onClick={this.openModal}><Icon name="edit"/>Add Section</Button>}
            >
                <Modal.Header>
                    Add Assessment Section
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={16} label="Assessment Section Name:" onChange={this.updateName.bind(this)} value={this.state.name} />
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.errorMessage ? <Label basic color="red" pointing="right">{this.state.errorMessage}</Label> : "" }
                    {this.state.successMessage ? <Label basic color="green" pointing="right">{this.state.successMessage}</Label> : ""}
                    <Button primary onClick={this.insertRankingSectionEntry.bind(this)}>Save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
import React from "react";
import {Modal, Button, Image, Label, Form, Input, Icon, Checkbox, Menu, Grid, Transition, Segment} from "semantic-ui-react";

import InvitationAPI from "../../../services/invitation-api";

export default class InvitationListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visibility: true,
            animation: "fade",
            duration: 200
        };
    }

    deleteInvitation(){
        InvitationAPI.delete_invitation(this.props.course_id, this.props.invitation.id).then((res) => {
            if (res.status === "success"){
                this.setState({visibility: !this.state.visibility});
                this.props.setSuccessMessage(res.message);
            } else {
                this.props.setErrorMessage(res.message);
            }
        });
    }

    render(){
        return(
            <Transition 
                animation={this.state.animation} 
                duration={this.state.duration}
                visible={this.state.visibility}
            >
                <div className="div-avatar-list">
                    <Segment>
                        <Grid columns={3} divided>
                            <Grid.Column width={8} className="avatar-list-text-padding">
                                <span>{"localhost:3002/auth/signup/" + this.props.invitation.link}</span>
                            </Grid.Column>
                            <Grid.Column className="avatar-list-text-padding" width={7}>
                                <span>Created: <i>{this.props.invitation.created_at.substring(0, 10) + " " + this.props.invitation.created_at.substring(11,19)}</i></span>
                                
                            </Grid.Column>
                            <Grid.Column width={1} className="avatar-list-text-padding">
                                <Icon color="red" name="delete" size="large" className="cursor-pointer" onClick={this.deleteInvitation.bind(this)}/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>
            </Transition>
        );
    }
}
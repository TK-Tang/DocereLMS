import React from "react";
import { Image, Segment, Button, Grid, Icon, Transition} from "semantic-ui-react";

import CourseAPI from "../../../services/course-api";

export default class StudentListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visibility: true,
            animation: "fade",
            duration: 200,
        }
    }
    kickUser(){
        CourseAPI.delete_kickUser(this.props.course_id, this.props.user.user_id).then((res) => {
            if (res.status === "success"){
                this.setState({visibility: !this.state.visibility});
                this.props.setSuccessMessage();
            } else {
                this.props.setErrorMessage();
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
                            <Grid.Column width={7}>
                                <Image
                                    src={this.props.user.profilePictureLink}
                                    avatar
                                    width="50px"
                                    height="50px"
                                    className="avatar-list"
                                />
                                <span>{this.props.user.username ? this.props.user.username : this.props.user.email}</span>
                            </Grid.Column>
                            <Grid.Column className="avatar-list-text-padding" width={7}>
                                <span>Joined: <i>{this.props.user.Roles.created_at.substring(0, 10) + " " + this.props.user.Roles.created_at.substring(11,19)}</i></span>
                                
                            </Grid.Column>
                            <Grid.Column width={2} className="avatar-list-text-padding">
                                <Icon color="red" name="delete" size="large" className="cursor-pointer" onClick={this.kickUser.bind(this)}/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>
            </Transition>
        );
    }
}
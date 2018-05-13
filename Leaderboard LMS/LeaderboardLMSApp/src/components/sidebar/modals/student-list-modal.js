import React from "react";
import {Modal, Menu, Image, Header, Segment, Button, Grid} from "semantic-ui-react";

import CourseAPI from "../../../services/course-api";

export default class StudentListModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            courseName: "",
            studentsList: []
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    getStudentList(course_id){
        this.state.studentsList = [];

        CourseAPI.get_courseIncludingStudents(course_id).then((res) => {
            if (res.status === "success"){
                this.setState({courseName: res.payload[0].name});

                for (var i = 0; i < res.payload[0].Users.length; i++){
                    let student = (
                        <div key={i} className="div-avatar-list">
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Column>
                                        <Image
                                            src={res.payload[0].Users[i].profilePictureLink}
                                            avatar
                                            width="50px"
                                            height="50px"
                                            className="avatar-list"
                                        />
                                        <span>{res.payload[0].Users[i].username ? res.payload[0].Users[i].username : res.payload[0].Users[i].email}</span>
                                    </Grid.Column>
                                    <Grid.Column className="avatar-list-text-padding">
                                        <span>Joined: <i>{res.payload[0].Users[i].Roles.created_at.substring(0, 10) + " " + res.payload[0].Users[i].Roles.created_at.substring(11,19)}</i></span>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </div>
                    )

                    this.state.studentsList.push(student)
                }

                this.forceUpdate();
            } else {
                let message = res.message;
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 2000});
                this.closeModal();
            }
        });
    }

    componentWillMount(){
        if (this.props.course_id === 0){ return; }
        this.getStudentList(this.props.course_id);
    }

    componentWillReceiveProps(props){
        if (props.course_id === 0){ return; }
        this.getStudentList(props.course_id);
    }

    render(){
        return (
        <Modal
            onClose={this.closeModal}
            size="tiny"
            open={this.state.modal}
            trigger = {
                <Menu.Item className="course-info-menu" onClick={this.openModal}>
                    Students
                </Menu.Item>
            }
        >
            <Modal.Header>Students of {this.state.courseName}</Modal.Header>
            <Modal.Content>
                {this.state.studentsList}
            </Modal.Content>

            <Modal.Actions>
                <Button onClick={this.closeModal} >Close</Button>
            </Modal.Actions>
        </Modal>
        );
    }
}
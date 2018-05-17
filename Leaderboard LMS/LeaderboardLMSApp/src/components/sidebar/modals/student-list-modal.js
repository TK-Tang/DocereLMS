import React from "react";
import {Modal, Menu, Button, Label} from "semantic-ui-react";

import CourseAPI from "../../../services/course-api";
import StudentListItem from "../list-item/student-list-item";

export default class StudentListModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            courseName: "",
            studentsList: [],
            errorMessage: "",
            successMessage: ""
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

    getStudentList(course_id){
        this.state.studentsList = [];

        CourseAPI.get_courseIncludingStudents(course_id).then((res) => {
            if (res.status === "success"){
                this.setState({courseName: res.payload[0].name});

                for (var i = 0; i < res.payload[0].Users.length; i++){
                    let student = (
                        <StudentListItem 
                            user={res.payload[0].Users[i]}
                            course_id={res.payload[0].id}
                            key={i}
                            setErrorMessage={this.setErrorMessage.bind(this)}
                            setSuccessMessage={this.setSuccessMessage.bind(this)}
                        />
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
                {this.state.errorMessage ? <Label basic color="red">{this.state.errorMessage}</Label> : "" }
                {this.state.successMessage ? <Label basic color="green">{this.state.successMessage}</Label> : ""}
                <Button onClick={this.closeModal}>Close</Button>
            </Modal.Actions>
        </Modal>
        );
    }
}
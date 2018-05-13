import React from "react";
import {Modal, Menu, Image, Header, Segment, Button} from "semantic-ui-react";

import CourseAPI from "../../../services/course-api";

export default class AdminListModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            modal: false,
            courseName: "",
            adminsList: []
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    getAdminList(course_id){
        this.state.adminsList = [];
        CourseAPI.get_courseIncludingAdmins(course_id).then((res) => {
            if (res.status === "success"){
                this.setState({courseName: res.payload[0].name})

                for (var i = 0 ; i < res.payload[0].Users.length ; i++){
                    let user = (
                        <Segment key={i}>
                            <Image
                                src={res.payload[0].Users[i].profilePictureLink}
                                avatar
                                width="50px"
                                height="50px"
                                className="avatar-list"
                            />
                            <span>{res.payload[0].Users[i].username ? res.payload[0].Users[i].username : res.payload[0].Users[i].email}</span>
                        </Segment>
                    )
                    this.state.adminsList.push(user);
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
        this.getAdminList(this.props.course_id);
    }

    componentWillReceiveProps(props){
        if (props.course_id === 0){ return; }
        this.getAdminList(props.course_id);
    }

    render(){
        return (
        <Modal
            onClose={this.closeModal}
            size="mini"
            open={this.state.modal}
            trigger = {
                <Menu.Item className="course-info-menu" onClick={this.openModal}>
                    Admins
                </Menu.Item>
            }
        >
            <Modal.Header>Admins of {this.state.courseName}</Modal.Header>
            <Modal.Content>
                {this.state.adminsList}
            </Modal.Content>

            <Modal.Actions>
                <Button onClick={this.closeModal} >Close</Button>
            </Modal.Actions>
        </Modal>
        );
    }
}
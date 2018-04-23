import React from "react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/authentication-api.js";
import Header from "./headers/header.js";

import { Sidebar, Segment, Button, Menu, Image, Icon } from "semantic-ui-react";

// require("velocity-animate");
// require("velocity-animate/velocity.ui");
// var VelocityTransitionGroup = require("velocity-react").VelocityTransitionGroup;

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarStatus: true,
            user: AuthAPI.get_currentUser()
        };
    }

    componentWillMount(){

    }

    sidebarToggle(){
        if (this.state.sidebarStatus) {
            this.setState({ sidebarStatus: false });
        } else {
            this.setState({ sidebarStatus: true });
        }
    }

    render() {
        return (        
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="slide along" width="thin" visible={this.state.sidebarStatus} icon="labeled" vertical inverted>
                        <Menu.Item name="home">
                            {this.state.user.email} | {this.state.user.username}
                        </Menu.Item>
                    </Sidebar>
                </Sidebar.Pushable>
                <Sidebar.Pusher>
                    <Segment basic>
                        <Header sidebarToggle={this.sidebarToggle.bind(this)}/>
                    </Segment>
                </Sidebar.Pusher>
            </div>
        );
    }
}
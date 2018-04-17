import React from "react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/auth-api.js";

import { Siderbar, Segment, Button, Menu, Image, Icon, Header } from "semantic-ui-react";

require("velocity-animate");
require("velocity-animate/velocity.ui");

var VelocityTransitionGroup = require("velocity-react").VelocityTransitionGroup;

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: CourseAPI.getCurrentUser()
        }
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="slide along" width="thin">
                        <Menu.Item name="home">
                            {this.state.user.email} | {this.state.user.username}
                        </Menu.Item>
                    </Sidebar>
                </Sidebar.Pushable>
            </div>
        );
    }
}
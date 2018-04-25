import React from "react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/authentication-api.js";
import Header from "./headers/header.js";

import { Sidebar, Segment, Button, Menu, Image, Icon } from "semantic-ui-react";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarStatus: true,
            user: {}
        };
    }

    componentWillMount(){
        AuthAPI.get_currentUser().then(res =>   
            this.setState({ user: res.payload })  
        );
    }

    sidebarToggle(){
        console.log("ASDF");
        if (this.state.sidebarStatus) {
            this.setState({ sidebarStatus: false });
        } else {
            this.setState({ sidebarStatus: true });
        }
    }

    signout(){
        AuthAPI.get_signout().then((res) => {
            if (res.status === "success"){
                this.props.history.replace('/');
                let message = "Signed Out from Leaderboard LMS";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
        });
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
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header 
                                sidebarToggle={this.sidebarToggle.bind(this)} 
                                signout={this.signout.bind(this)}
                            />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
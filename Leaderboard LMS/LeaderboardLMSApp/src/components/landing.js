import React from "react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/authentication-api.js";
import Header from "./headers/header.js";
import CourseList from "./sidebar/course-list.js"

import { Sidebar, Segment, Button, Menu, Image, Icon } from "semantic-ui-react";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarStatus: true,
            courseId: 0,
            user: {}
        };
    }

    componentWillMount(){
        AuthAPI.get_currentUser().then(res =>  {
            console.log(res);
            this.setState({ user: res.payload });
        });
    }

    sidebarToggle(){
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
        console.log(this.state.user);
        return (        
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="slide along" visible={this.state.sidebarStatus} icon="labeled" vertical inverted>
                        { this.state.user.email ? <CourseList user={this.state.user} /> : <Menu.Item>loading...</Menu.Item>}
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header 
                                sidebarToggle={this.sidebarToggle.bind(this)} 
                                signout={this.signout.bind(this)}
                            />

                            <div style={{height: "100vh"}}>
                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
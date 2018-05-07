import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon } from "semantic-ui-react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/authentication-api.js";

import Header from "./headers/header.js";
import CourseList from "./sidebar/course-list.js"

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sidebarStatus: true,
            courseId: 1,
            user: {},
            dashboardBlob: ""
        };
    }

    componentWillMount(){
        AuthAPI.get_currentUser().then(res =>  {
            if (res.status !== "success"){
                this.props.history.replace('/');
                let message = "You're not signed in on Leaderboard LMS";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
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

    loadForums(){
        CourseAPI.get_courseForums(this.state.courseId).then((res) => {
            if (res.status === "success"){
                let message = "Forums loaded";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
                this.setState({dashboardBlob: res.payload});
            }
        });
    }

    loadLeaderboard(){
        
    }

    render() {

        
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="slide along" visible={this.state.sidebarStatus} icon="labeled" vertical inverted>
                        { this.state.user.email ? <CourseList user={this.state.user} /> : <Menu.Item>loading...</Menu.Item>}
                    </Sidebar>
                    <Sidebar.Pusher className="main">
                        <Segment basic>
                            <Header 
                                sidebarToggle={this.sidebarToggle.bind(this)}
                                loadForums={this.loadForums.bind(this)}
                                signout={this.signout.bind(this)}
                            />

                            <div style={{height: "100vh"}}>
                                <p dangerouslySetInnerHTML={{__html: this.state.dashboardBlob}}/>
                                <ol>
                                    <li>{this.state.dashboardBlob.Forums ? this.state.dashboardBlob.Forums[1].name : "loading..."}</li>
                                    <li>{this.state.dashboardBlob.Forums ? this.state.dashboardBlob.Forums[2].name : "loading..."}</li>
                                    <li>{this.state.dashboardBlob.Forums ? this.state.dashboardBlob.Forums[3].name : "loading..."}</li>
                                    <li>{this.state.dashboardBlob.Forums ? this.state.dashboardBlob.Forums[4].name : "loading..."}</li>
                                    <li>{this.state.dashboardBlob.Forums ? this.state.dashboardBlob.Forums[0].name : "loading..."}</li>
                                </ol>
                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
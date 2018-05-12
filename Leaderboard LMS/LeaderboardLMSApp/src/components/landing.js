import React from "react";
import { Sidebar, Segment, Menu, Icon, Input, Divider } from "semantic-ui-react";

import AuthAPI from "../services/authentication-api.js";

import CourseList from "./sidebar/course-list.js";
import LeaderboardList from "./sidebar/leaderboard-list.js";
import ChatList from "./sidebar/chat-list.js";
import ForumList from "./sidebar/forum-list.js";
import DownloadList from "./sidebar/download-list.js";
import CourseInfoList from "./sidebar/course-info-list.js";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            course_id: 0,
            
        };
    }

    componentWillMount(){
        AuthAPI.get_currentUser().then(res =>  {
            if (res.status !== "success"){
                this.props.history.replace('/');
                let message = "You're not signed in on Leaderboard LMS, you need to sign in mate.";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
            this.setState({ user: res.payload });
        });
    }

    signout(){
        AuthAPI.get_signout().then((res) => {
            if (res.status === "success"){
                this.props.history.replace('/');
                let message = "Signed out from Leaderboard LMS. See you later, check back soon!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
        });
    }

    selectCourse(i){
        this.setState({course_id: i});
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} visible={true} icon="labeled" vertical inverted>
                        {this.state.user.email ? <CourseList user={this.state.user} signout={this.signout.bind(this)} selectCourse={this.selectCourse.bind(this)} /> : <Menu.Item>loading...</Menu.Item>}
                    </Sidebar>
                    <Sidebar.Pusher className="main">
                        <Sidebar as={Menu} visible={true} icon="labeled" className="course-menu" vertical inverted>
                            <Menu inverted vertical className="course-menu">
                                <Divider/>
                                <Menu.Item >
                                    <Input placeholder='Search...' />
                                </Menu.Item>
                                <Divider/>
                                <LeaderboardList course_id={this.state.course_id} />   
                                <Divider />
                                <ChatList course_id={this.state.course_id} />
                                <Divider />
                                <ForumList course_id={this.state.course_id}/>
                                <Divider />
                                <DownloadList course_id={this.state.course_id} />
                                <Divider />
                                <CourseInfoList course_id={this.state.course_id} />
                                <Divider />
                            </Menu>
                        </Sidebar>

                        <Sidebar.Pusher>
                            <Segment basic>
                                <div style={{height: "100vh"}}>
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                        
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
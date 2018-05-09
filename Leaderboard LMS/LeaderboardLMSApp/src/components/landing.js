import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Input, Divider, Header } from "semantic-ui-react";

import CourseAPI from "../services/course-api.js";
import AuthAPI from "../services/authentication-api.js";

import CourseList from "./sidebar/course-list.js";
import LeaderboardList from "./sidebar/leaderboard-list.js";
import ChatList from "./sidebar/chat-list.js";
import ForumList from "./sidebar/forum-list.js";
import DownloadList from "./sidebar/download-list.js"

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            course_id: 1,
            hideLeaderboardList: false,
            hideChatList: false,
            hideForumList: false,
            hideDownloadList: false
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

    selectCourse(){
        console.log("asdfd");
        this.setState({course_id: 1});
    }

    toggleLeaderboardListDisplay(){
        this.setState({ hideLeaderboardList: !this.state.hideLeaderboardList});
    }

    toggleChatListDisplay(){
        this.setState({ hideChatList: !this.state.hideChatList});
    }

    toggleForumListDisplay(){
        this.setState({ hideForumList: !this.state.hideForumList});
    }

    toggleDownloadListDisplay(){
        this.setState({ hideDownloadList: !this.state.hideDownloadList});
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
                                <Menu.Item>
                                    <div className="course-menu-category" onClick={this.toggleLeaderboardListDisplay.bind(this)}><Icon name="chevron right" /> LEADERBOARDS <Icon disabled name="chart line" /></div>
                                    <Menu.Menu className={this.state.hideLeaderboardList ? "void" : ""}>
                                        <LeaderboardList course_id={this.state.course_id} />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Divider />
                                <Menu.Item>
                                    <div className="course-menu-category" onClick={this.toggleChatListDisplay.bind(this)}><Icon name="chevron right" />  CHAT CHANNELS <Icon disabled name="comments" /></div>
                                    <Menu.Menu className={this.state.hideChatList ? "void" : ""}>
                                        <ChatList course_id={this.state.course_id} />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Divider inverted/>
                                <Menu.Item>
                                    <div className="course-menu-category" onClick={this.toggleForumListDisplay.bind(this)}><Icon name="chevron right" />  FORUMS <Icon disabled name="columns" /></div>
                                    <Menu.Menu className={this.state.hideForumList ? "void" : ""}>
                                        <ForumList course_id={this.state.course_id} />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Divider />
                                <Menu.Item>
                                    <div className="course-menu-category" onClick={this.toggleDownloadListDisplay.bind(this)}><Icon name="chevron right" />  DOWNLOADS <Icon disabled name="book" /></div>
                                    <br/>
                                    <div className={this.state.hideDownloadList ? "void" : ""}>
                                        <DownloadList course_id={this.state.course_id} />
                                    </div>
                                </Menu.Item>
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
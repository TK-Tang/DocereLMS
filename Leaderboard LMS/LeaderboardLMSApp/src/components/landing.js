import React from "react";
import {Sidebar, Segment, Menu, Input, Divider} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";

import AuthAPI from "../services/authentication-api.js";

import CourseList from "./sidebar/course-list.js";
import LeaderboardList from "./sidebar/leaderboard-list.js";
import ChannelList from "./sidebar/channel-list.js";
import ForumList from "./sidebar/forum-list.js";
import DownloadList from "./sidebar/download-list.js";
import CourseInfoList from "./sidebar/course-info-list.js";

import Leaderboard from "./leaderboard/leaderboard.js";
import Download from "./download/download.js";
import Channel from "./channel/channel.js";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            course_id: 0
        };
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

    loadUser(){
        AuthAPI.get_currentUser().then(res =>  {
            if (res.status !== "success"){
                this.props.history.replace('/');
                let message = "You're not signed in on Leaderboard LMS, you need to sign in.";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 2000 });
            }
            this.setState({ user: res.payload });
        });
    }

    selectLeaderboard(i){
        this.props.history.replace("/landing/leaderboard/" + i);
    }

    selectDownload(i){
        this.props.history.replace("/landing/download/" + i);
    }

    selectChannel(i){
        this.props.history.replace("/landing/channel/" + i);
    }

    selectCourse(i){
        this.setState({course_id: i});
    }

    componentWillMount(){
        this.loadUser();
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} visible={true} icon="labeled" vertical inverted>
                        {this.state.user.email ? <CourseList user={this.state.user} signout={this.signout.bind(this)} loadUser={this.loadUser.bind(this)} selectCourse={this.selectCourse.bind(this)} /> : <Menu.Item>loading...</Menu.Item>}
                    </Sidebar>
                    <Sidebar.Pusher className="main">
                        <Sidebar as={Menu} visible={true} icon="labeled" className="course-menu" vertical inverted>
                            <Menu inverted vertical className="course-menu">
                                <Divider/>
                                <Menu.Item >
                                    <Input placeholder='Search...' />
                                </Menu.Item>
                                <Divider/>
                                <LeaderboardList 
                                    course_id={this.state.course_id} 
                                    selectLeaderboard={this.selectLeaderboard.bind(this)} 
                                />   
                                <Divider />
                                <ChannelList 
                                    course_id={this.state.course_id} 
                                    selectChannel={this.selectChannel.bind(this)}
                                />
                                <Divider />
                                <ForumList course_id={this.state.course_id}/>
                                <Divider />
                                <DownloadList 
                                    course_id={this.state.course_id} 
                                    selectDownload={this.selectDownload.bind(this)}
                                />
                                <Divider />
                                <CourseInfoList course_id={this.state.course_id} />
                                <Divider />
                            </Menu>
                        </Sidebar>

                        <Sidebar.Pusher style={{height: "100vh", width: "80%" }}>
                            <Switch>
                                <Route path="/landing/leaderboard/:leaderboard_id" render={(props) => <Leaderboard course_id={this.state.course_id} {...props}/>} />
                                <Route path="/landing/download/:category_id" render={(props) => <Download course_id={this.state.course_id} {...props} />} />
                                <Route path="/landing/channel/:channel_id" render={(props) => <Channel course_id={this.state.course_id} {...props} />} />
                            </Switch>
                        </Sidebar.Pusher>
                        
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
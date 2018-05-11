import React from "react";
import {Menu, Icon} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";

export default class ChatList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hideChatList: false,
            channelList: []
        }
    }

    
    toggleChatListDisplay(){
        this.setState({hideChatList: !this.state.hideChatList});
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0){ return; };
        this.setState({ channelList: []});

        CourseAPI.get_courseChannels(props.course_id).then((res) => {
            if (res.status === "success"){
                for (var i = 0; i < res.payload.Channels.length; i++){
                    let channel = (
                        <Menu.Item key={i} className="sub-menu">
                            {"# " + res.payload.Channels[i].name.toLowerCase()}
                        </Menu.Item>
                    )

                    this.state.channelList.push(channel);
                }

                this.forceUpdate();
            } else {
                let message = "Chat channels could not be loaded at this time";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 2000});
            }
        });
    }


    render() {
        return (
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleChatListDisplay.bind(this)}><Icon name="chevron right" />  CHAT CHANNELS <Icon disabled name="comments" /></div>
                <Menu.Menu className={this.state.hideChatList ? "void" : ""}>
                    <div>
                        {this.state.channelList}
                    </div>
                </Menu.Menu>
            </Menu.Item>
        );
    }
}
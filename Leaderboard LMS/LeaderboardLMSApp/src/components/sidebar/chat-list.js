import React from "react";
import {Menu} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";

export default class ChatList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            channelList: []
        }
    }

    componentWillReceiveProps(props) {
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
            <div>
                {this.state.channelList.length === 0 ? <Menu.Item key={1} className="sub-menu">Loading...</Menu.Item> : this.state.channelList}
            </div>
        );
    }
}
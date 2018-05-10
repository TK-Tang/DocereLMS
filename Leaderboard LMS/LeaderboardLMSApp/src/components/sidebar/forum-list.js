import React from "react";
import {Menu} from "semantic-ui-react"

import CourseAPI from "../../services/course-api";

export default class ForumList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            forumList: []
        }
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0){ return; };
        this.setState({ forumList: []});

        CourseAPI.get_courseForums(props.course_id).then((res) => {
            if (res.status === "success"){
                for (var i = 0; i < res.payload.Forums.length; i++){
                    let forum = (
                        <Menu.Item key={i} className="forum-menu">
                            {res.payload.Forums[i].name}
                        </Menu.Item>
                    );

                    this.state.forumList.push(forum);
                }

                this.forceUpdate();
            } else {
                let message = "Forums could not be loaded at this time";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 2000});
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.forumList}
            </div>
        );
    }
}
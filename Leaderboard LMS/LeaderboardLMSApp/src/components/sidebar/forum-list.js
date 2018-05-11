import React from "react";
import {Menu, Icon} from "semantic-ui-react"

import CourseAPI from "../../services/course-api";

export default class ForumList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hideForumList: false,
            forumList: []
        }
    }

    toggleForumListDisplay(){
        this.setState({hideForumList: !this.state.hideForumList});
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
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleForumListDisplay.bind(this)}><Icon name="chevron right" />  FORUMS <Icon disabled name="columns" /></div>
                <Menu.Menu>
                    <div className={this.state.hideForumList ? "void" : ""}>
                        {this.state.forumList}
                    </div>
                </Menu.Menu>
            </Menu.Item>
        );
    }
}
import React from "react";
import {Image, Icon, Menu} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";
import UserAPI from "../../services/user-api";

export default class CourseList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            courseList: null
        }
    }

    componentWillMount() {
        UserAPI.get_userIncludingCourses("tk@gmail.com").then((res) => {
            console.log(res);
        });
    }

    render (){
        return (
            <Menu.Item name="home">
                {this.props.user.email} | {this.props.user.username}
            </Menu.Item>
        );
    }
}
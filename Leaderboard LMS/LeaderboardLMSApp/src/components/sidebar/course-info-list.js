import React from "react";
import {Menu} from "semantic-ui-react";

export default class CourseInfoList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            courseInfoList: []
        }
    }

    render(){
        return (
            <div>
                <Menu.Item className="course-info-menu">
                    Course Details
                </Menu.Item>
                <Menu.Item className="course-info-menu">
                    Admins
                </Menu.Item>
                <Menu.Item className="course-info-menu">
                    Students
                </Menu.Item>
            </div>
        )
    }
}
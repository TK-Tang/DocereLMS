import React from "react";
import {Menu, Icon} from "semantic-ui-react";

export default class CourseInfoList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hideCourseInfoList: false,
            courseInfoList: []
        }
    }

    toggleCourseInfoListDisplay(){
        this.setState({hideCourseInfoList: !this.state.hideCourseInfoList});
    }

    render(){
        return (
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleCourseInfoListDisplay.bind(this)}><Icon name="chevron right" />  COURSE INFO <Icon disabled name="newspaper" /></div>
                <br/>
                <div className={this.state.hideCourseInfoList ? "void" : ""}>
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
                </div>
            </Menu.Item>
        )
    }
}
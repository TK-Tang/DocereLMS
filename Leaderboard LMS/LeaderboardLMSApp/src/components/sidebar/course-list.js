import React from "react";
import {Image, Icon, Menu, Popup, Button, Transition} from "semantic-ui-react";

import CoursePopUpInfo from "./course-popup-info";

import CourseAPI from "../../services/course-api";
import UserAPI from "../../services/user-api";

export default class CourseList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            courseList: []
        }
    }

    componentWillMount() {
        console.log("asdf");
        UserAPI.get_userIncludingCourses(this.props.user.email).then((res) => {

            this.state.courseList.push(
                <Menu.Item key={-1}>
                    {(this.props.user.username) ? this.props.user.username : this.props.user.email }
                </Menu.Item>
            );

            for (var i = 0 ; i < res.payload.Courses.length ; i++){
                let courseIcon = (
                    <div key={i}>                        
                        <Menu.Item> 
                            <CoursePopUpInfo course={res.payload.Courses[i]} />
                        </Menu.Item>
                    </div>
                );
                this.state.courseList.push(courseIcon);
            }
            this.forceUpdate();
        });
    }

    render (){
        return (
            <div>
                {this.state.courseList}
            </div>
        );
    }
}
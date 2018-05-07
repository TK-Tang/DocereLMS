import React from "react";
import {Image, Icon, Menu, Popup, Button, Transition} from "semantic-ui-react";

import CoursePopupInfo from "./popups/course-popup-info";


import CourseAPI from "../../services/course-api";
import UserAPI from "../../services/user-api";

import UserProfileModal from "./modals/user-profile-modal";

export default class CourseList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            courseList: []
        }
    }

    componentWillMount() {
        UserAPI.get_userIncludingCourses(this.props.user.email).then((res) => {

            this.state.courseList.push(
                <div key={-1}>
                    <Menu.Item>
                        <UserProfileModal user={this.props.user} />
                    </Menu.Item>
                </div>
            );

            this.state.courseList.push(
                <div key={-2}>
                    <Menu.Item>
                        <Image
                            src="https://wallpapertag.com/wallpaper/full/8/3/c/116088-full-size-dark-grey-background-2560x1600.jpg"
                            width="60px"
                            height="5px"
                        />
                    </Menu.Item>
                </div>
            )

            for (var i = 0 ; i < res.payload.Courses.length ; i++){
                let courseIcon = (
                    <div key={i}>                        
                        <Menu.Item> 
                            <CoursePopupInfo course={res.payload.Courses[i]} />
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
import React from "react";
import {Image, Icon, Menu, Popup, Button, Transition} from "semantic-ui-react";

import CoursePopupInfo from "./popups/course-popup-info";
import UserAPI from "../../services/user-api";
import UserProfileModal from "./modals/user-profile-modal";

export default class CourseList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            courseList: []
        }
    }

    signout(){
        this.props.signout();
    }

    componentWillMount() {
        UserAPI.get_userIncludingCourses(this.props.user.email).then((res) => {

            this.state.courseList.push(
                <div key={-1}>
                    <Menu.Item>
                        <UserProfileModal 
                            user={this.props.user} 
                            signout={this.signout.bind(this)} 
                        />
                    </Menu.Item>
                </div>
            );

            this.state.courseList.push(
                <div key={-2}>
                    <Menu.Item>
                        <Image
                            src="http://xycletracx.nl/images/1784.jpg"
                            width="60px"
                            height="5px"
                        />
                    </Menu.Item>
                </div>
            )

            for (var i = 0; i < res.payload.Courses.length; i++){
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

    render() {
        return (
            <div>
                {this.state.courseList}
            </div>
        );
    }
}
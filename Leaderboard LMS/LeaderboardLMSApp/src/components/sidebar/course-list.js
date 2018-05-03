import React from "react";
import {Image, Icon, Menu} from "semantic-ui-react";

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
        UserAPI.get_userIncludingCourses("tk@gmail.com").then((res) => {

            this.state.courseList.push(
                <Menu.Item>
                    {(!this.props.user.username) ? this.props.user.email : this.props.user.email }
                </Menu.Item>
            );

            for (var i = 0 ; i < res.payload.Courses.length ; i++){
                let courseIcon = (
                    <div key={i}>
                        <Image 
                            src={res.payload.Courses[i].pictureLink}
                            size="mini"
                            shape="circular"
                            style={{display:"inline-block"}}
                        />
                        <Menu.Item>
                            {res.payload.Courses[i].name}
                        </Menu.Item>
                        <hr/>
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
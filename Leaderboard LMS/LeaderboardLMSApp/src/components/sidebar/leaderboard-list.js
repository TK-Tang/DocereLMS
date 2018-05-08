import React from "react";
import {Menu} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";

export default class LeaderboardList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            leaderboardList: []
        }
    }

    componentWillMount() {
        CourseAPI.get_courseLeaderboards(this.props.course_id).then((res) => {
            if (res.status === "success"){
                for (var i = 0; i < res.payload.Leaderboards.length; i++){
                    let leaderboard = (
                        <Menu.Item key={i} className="sub-menu">
                            {res.payload.Leaderboards[i].name}
                        </Menu.Item>
                    );

                    this.state.leaderboardList.push(leaderboard);
                }

                this.forceUpdate();
            } else {
                let message = "Leaderboards could not be loaded at this time";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 2000});
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.leaderboardList}
            </div>
        );
    }
}
import React from "react";
import {Menu, Icon} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";

export default class LeaderboardList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hideLeaderboardList: false,
            leaderboardList: []
        }
    }

    toggleLeaderboardListDisplay(){
        this.setState({hideLeaderboardList: !this.state.hideLeaderboardList});
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0){ return; };
        this.setState({ leaderboardList: []});

        CourseAPI.get_courseLeaderboards(props.course_id).then((res) => {
            if (res.status === "success"){
                for (var i = 0; i < res.payload.Leaderboards.length; i++){
                    let leaderboard = (
                        <Menu.Item key={i} className="leaderboard-menu">
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
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleLeaderboardListDisplay.bind(this)}><Icon name="chevron right" /> LEADERBOARDS <Icon disabled name="chart line" /></div>
                    <Menu.Menu className={this.state.hideLeaderboardList ? "void" : ""}>
                        <div>
                            {this.state.leaderboardList}
                        </div>
                    </Menu.Menu>
            </Menu.Item>
        );
    }
}
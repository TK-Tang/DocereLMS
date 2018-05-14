import React from "react";
import {Segment} from "semantic-ui-react";

export default class Leaderboard extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("")
    }

    render() {
        return(
            <Segment>
                Leaderboard
            </Segment>
        );
    }
}

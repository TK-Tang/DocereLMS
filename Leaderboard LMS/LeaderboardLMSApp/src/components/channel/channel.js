import React from "react";
import {Segment} from "semantic-ui-react";

export default class Channel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            a: ""
        };
    }

    render() {
        return(
            <Segment>
                Channel
            </Segment>
        );
    }
}

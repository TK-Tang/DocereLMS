import React from "react";
import { Button, Icon, Grid, Popup } from "semantic-ui-react";

import AuthAPI from "../../services/authentication-api";

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    sidebarToggle(){
        this.props.sidebarToggle();
    }

    signout(){
        this.props.signout();
    }

    render() {
        return (
            <div className = "header-banner">
                <Grid className="width-100-percent-important">
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <div className="inline-block">
                                <a className = "no-text-decoration" onClick={this.sidebarToggle.bind(this)}>
                                    <Icon name="sidebar" size="big" className = "vertical-align-middle header-banner-icon" />
                                </a>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Button.Group>
                                <Button size="big" icon="list alternate" content="Forums" />
                                <Button size="big" icon="comments" content="Chat" />
                                <Button size="big" icon="chart line" content="Leaderboard" />
                                <Button size="big" icon="plane" content="Sign Out" onClick={this.signout.bind(this)}/>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
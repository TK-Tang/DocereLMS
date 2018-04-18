import React from "react";
import { Button, Icon, Grid, Popup } from "semantic-ui-react";

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    sidebarToggle(){
        this.props.sidebarToggle();
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
                                <Button size="big" icon="map" content="Dashboard" />
                                <Button size="big" icon="list layout" content="Tasks" />
                                <Button size="big" content="Agents" />
                                <Button size="big" icon="users" content="Teams" />
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
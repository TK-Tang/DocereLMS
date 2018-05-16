import React from "react";
import {Segment, Grid, Loader, Header, Divider, Container, Label, Table} from "semantic-ui-react";

import LeaderboardAPI from "../../services/leaderboard-api";

export default class Leaderboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            leaderboard: null,
            rankings: []
        }
    }

    componentWillReceiveProps(){
        if (!this.props.course_id){ return; }

        this.state.rankings = [];
        var leaderboard_id = this.props.match.params.leaderboard_id;

        LeaderboardAPI.get_leaderboardIncludingRankings(this.props.course_id, leaderboard_id).then((res) => {
            if (res.status === "success"){
                this.setState({leaderboard: res.payload});
                for (var i = 0; i < res.payload.Rankings.length; i++){
                    let r = res.payload.Rankings[i];

                    let ranking = (
                        <Table.Row key={i}>
                            <Table.Cell><Label>{r.User.email ? r.User.email : r.User.username}</Label></Table.Cell>
                            <Table.Cell>{r.note}</Table.Cell>
                            <Table.Cell>{r.mark}</Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankings.push(ranking);
                }

                this.forceUpdate();
            }
        });
    }

    render() {
        var leaderboard_id = this.props.match.params.leaderboard_id;

        if (!this.state.leaderboard){ return(""); }

        return(
            <div>
                <Divider />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4} >
                            <Segment color="blue"><Header>{this.state.leaderboard.name}</Header></Segment>
                            <Segment color="blue"> 
                                <Header>Audit</Header>
                                <p>Leaderboard created: <i>{this.state.leaderboard.created_at.substring(0, 10) + " " + this.state.leaderboard.created_at.substring(11, 19)}</i></p>
                                <p>Leaderboard updated: <i>{this.state.leaderboard.updated_at.substring(0, 10) + " " + this.state.leaderboard.updated_at.substring(11, 19)}</i></p>
                                <p>Leaderboard ID: <i>{this.state.leaderboard.id}</i></p>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment color="blue"> 
                                <Container text>
                                    <Header as="h3">Description</Header>
                                    <p>
                                        {this.state.leaderboard.blurb}
                                    </p>

                                    <p><b>Weighting: {this.state.leaderboard.weighting}%</b></p>
                                </Container>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid>
                    <Grid.Column width={11}>
                        <Table singleLine>
                            <Table.Header>
                                <Table.HeaderCell>Username</Table.HeaderCell>
                                <Table.HeaderCell>Note</Table.HeaderCell>
                                <Table.HeaderCell>Marks</Table.HeaderCell>
                            </Table.Header>

                            <Table.Body>
                                {this.state.rankings}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

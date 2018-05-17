import React from "react";
import {Segment, Grid, Header, Divider, Table, Icon} from "semantic-ui-react";

import LeaderboardAPI from "../../services/leaderboard-api";
import RankingSectionModal from "./modals/ranking-section-modal.js";

export default class Leaderboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            leaderboard: null,
            rankings: [],
            averageMark: 0,
            totalRankings: 0
        }
    }

    componentWillReceiveProps(newProps){
        if (!newProps.course_id){ return; }

        this.state.rankings = [];
        var leaderboard_id = newProps.match.params.leaderboard_id;

        LeaderboardAPI.get_leaderboardIncludingRankings(newProps.course_id, leaderboard_id).then((res) => {
            if (res.status === "success"){

                let totalMarks = 0;
                this.setState({leaderboard: res.payload});
                
                for (var i = 0; i < res.payload.Rankings.length; i++){
                    let r = res.payload.Rankings[i];
                    let totalMarks = totalMarks + r.mark;

                    let ranking = (
                        <Table.Row key={i}>
                            <Table.Cell width={3}>{r.User.email ? r.User.email : r.User.username}</Table.Cell>
                            <Table.Cell width={10}>{r.note}</Table.Cell>
                            <Table.Cell width={1}>{r.mark}</Table.Cell>
                            <Table.Cell width={1}>
                                <RankingSectionModal Ranking={r} RankingSections={res.payload.RankingSections} LeaderboardName={res.payload.name}/>
                            </Table.Cell>
                            <Table.Cell width={1}>
                                <Icon name="cogs" className="icon-blue teal-hover cursor-pointer" size="large"/>
                            </Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankings.push(ranking);
                }

                this.setState({totalRankings: res.payload.Rankings.length});
                this.setState({averageMark: totalMarks/res.payload.Rankings.length});
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
                    <Grid.Row stretched>
                        <Grid.Column width={4} >
                            <Segment color="blue"><Header>{this.state.leaderboard.name}</Header></Segment>
                            <Segment color="blue"> 
                                <p><b>Weighting: {this.state.leaderboard.weighting}%</b></p>
                                <p><b>Average Mark: {this.state.averageMarks}</b></p>
                                <p><b>Total Rankings: {this.state.totalRankings}</b></p>

                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment color="blue" style={{ minHeight: 100}}> 
                                <Header as="h3">Description</Header>
                                <p>{this.state.leaderboard.blurb}</p>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Segment color="grey">
                                <Header>Audit</Header>
                                <p>Leaderboard created: <i>{this.state.leaderboard.created_at.substring(0, 10) + " " + this.state.leaderboard.created_at.substring(11, 19)}</i></p>
                                <p>Leaderboard updated: <i>{this.state.leaderboard.updated_at.substring(0, 10) + " " + this.state.leaderboard.updated_at.substring(11, 19)}</i></p>
                                <p>Leaderboard ID: <i>{this.state.leaderboard.id}</i></p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                <Divider/>
                <Grid>
                    <Grid.Column width={15}>
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Note</Table.HeaderCell>
                                    <Table.HeaderCell>Marks</Table.HeaderCell>
                                    <Table.HeaderCell>Sections</Table.HeaderCell>
                                    <Table.HeaderCell>Anonymity</Table.HeaderCell>
                                </Table.Row>
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

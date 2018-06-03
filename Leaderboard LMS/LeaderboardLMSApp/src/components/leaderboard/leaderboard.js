import React from "react";
import {Segment, Grid, Header, Divider, Table, Image, Button, Icon} from "semantic-ui-react";

import LeaderboardAPI from "../../services/leaderboard-api";

import RankingSectionEntryModal from "./modals/ranking-section-entry-modal.js";
import AnonymityModal from "./modals/anonymity-modal.js";
import LeaderboardUpdateModal from "./modals/leaderboard-update-modal.js";
import DeleteLeaderboardModal from "./modals/delete-leaderboard-modal.js";
import InsertRankingModal from "./modals/insert-ranking-modal.js";
import UpdateRankingModal from "./modals/update-ranking-modal.js";
import RankingSectionModal from "./modals/ranking-section-modal.js";

export default class Leaderboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            course_id: 0,
            leaderboard: null,
            rankingSections: [],
            rankings: [],
            averageMark: 0,
            totalRankings: 0
        }
    }

    componentWillMount(){
        if (!this.props.course_id){ return; }
        var leaderboard_id = this.props.match.params.leaderboard_id;

        this.retrieveLeaderboard(this.props.course_id, leaderboard_id);
    }

    componentWillReceiveProps(newProps){
        if (!newProps.course_id){ return; }
        var leaderboard_id = newProps.match.params.leaderboard_id;

        this.retrieveLeaderboard(newProps.course_id, leaderboard_id);
    }

    retrieveLeaderboard(course_id, leaderboard_id){
        this.state.rankings = [];
        LeaderboardAPI.get_leaderboardIncludingRankings(course_id, leaderboard_id).then((res) => {
            if (res.status === "success"){

                var totalMarks = 0;
                this.setState({leaderboard: res.payload});
                this.setState({rankingSections: res.payload.RankingSections});
                
                for (var i = 0; i < res.payload.Rankings.length; i++){
                    let r = res.payload.Rankings[i];
                    totalMarks = totalMarks + r.mark;

                    let ranking = (
                        <Table.Row key={i}>
                            <Table.Cell width={1}>#{i + 1}</Table.Cell>
                            <Table.Cell width={1}><Image src={r.User.profilePictureLink} size="mini"/></Table.Cell>
                            <Table.Cell width={3}>{r.User.username ? r.User.username : r.User.email}</Table.Cell>
                            <Table.Cell width={7}>{r.note}</Table.Cell>
                            <Table.Cell width={1}>{r.mark}</Table.Cell>
                            <Table.Cell width={1}>
                                <RankingSectionEntryModal course_id={course_id} ranking={r} rankingSections={res.payload.RankingSections} leaderboardName={res.payload.name}/>
                            </Table.Cell>
                            <Table.Cell width={1}>
                                <AnonymityModal Anonymity={r.StudentAnonymitySetting} course_id={course_id} ranking_id={r.id} />
                            </Table.Cell>
                            <Table.Cell width={1}>
                               <UpdateRankingModal leaderboard_id={this.state.leaderboard.id} retrieveLeaderboard={this.retrieveLeaderboard.bind(this)} course_id={course_id} ranking={r}/>
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

    render(){
        if (!this.state.leaderboard){ return(""); }

        return(
            <div className="ui bottom attached pushable">
                <div className="pusher">
                    <Divider />
                    <Grid>
                        <Grid.Row stretched>
                            <Grid.Column width={4} >
                                <Segment color="blue"><Header>{this.state.leaderboard.name}</Header></Segment>
                                <Segment color="blue"> 
                                    <p><b>Weighting: {this.state.leaderboard.weighting}%</b></p>
                                    <p><b>Average Mark: {Math.round(this.state.averageMark)}</b></p>
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
                                        <Table.HeaderCell>Rank</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Username</Table.HeaderCell>
                                        <Table.HeaderCell>Notes</Table.HeaderCell>
                                        <Table.HeaderCell>Marks</Table.HeaderCell>
                                        <Table.HeaderCell>Sections</Table.HeaderCell>
                                        <Table.HeaderCell>Anon</Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.rankings}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>
                    <Divider />

                    <Grid>
                        <Grid.Column width={15}>
                            <InsertRankingModal leaderboard_id={this.state.leaderboard.id} course_id={this.props.course_id} retrieveLeaderboard={this.retrieveLeaderboard.bind(this)} />
                            <RankingSectionModal leaderboard_id={this.state.leaderboard.id} course_id={this.props.course_id} retrieveLeaderboard={this.retrieveLeaderboard.bind(this)} rankingSections={this.state.rankingSections} />

                            <DeleteLeaderboardModal />
                            <LeaderboardUpdateModal floated="right" leaderboard={this.state.leaderboard} course_id={this.props.course_id} retrieveLeaderboard={this.retrieveLeaderboard.bind(this)} />
                            <Button floated="right" ><Icon name="area chart" />Charts</Button>
                        </Grid.Column>
                    </Grid>

                    
                    <Divider/>
                </div>
            </div>
        );
    }
}

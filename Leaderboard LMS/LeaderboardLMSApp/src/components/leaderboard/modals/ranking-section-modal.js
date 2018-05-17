import React from "react";
import {Modal, Button, Icon, Table} from "semantic-ui-react";

export default class RankingSectionModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            rankingSectionList: []
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    componentWillMount(){
        for (var i = 0; i < this.props.RankingSections.length ; i++){
            for (var j = 0; j < this.props.Ranking.RankingSectionEntries.length; j++){
                if (this.props.RankingSections[i].id === this.props.Ranking.RankingSectionEntries[j].ranking_section_id){
                    let rankingSection = (
                        <Table.Row key={i}>
                            <Table.Cell width={8}>
                                {this.props.RankingSections[i].name}
                            </Table.Cell>
                            <Table.Cell width={8}>
                                {this.props.Ranking.RankingSectionEntries[j].mark}
                            </Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankingSectionList.push(rankingSection);
                }
            }

            this.forceUpdate();
        }
    }

    render() {
        return (
            <Modal
                onClose={this.closeModal}
                size="small"
                open={this.state.modal}
                trigger={
                    <Icon name="tasks" className="cursor-pointer teal-hover icon-blue" size="large" onClick={this.openModal}/>
                }
            >
                <Modal.Header>{this.props.LeaderboardName}</Modal.Header>
                <Modal.Content>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Section</Table.HeaderCell>
                                <Table.HeaderCell>Marks</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.rankingSectionList.length != 0 ? this.state.rankingSectionList : 
                                <Table.Row>
                                    <Table.Cell width={16}>
                                        This student has choosen to remain to keep their marks hidden.
                                    </Table.Cell>
                                </Table.Row>
                            }
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

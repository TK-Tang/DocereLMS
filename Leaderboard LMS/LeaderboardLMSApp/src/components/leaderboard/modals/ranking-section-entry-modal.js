import React from "react";
import {Modal, Button, Icon, Table} from "semantic-ui-react";

export default class RankingSectionEntryModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            rankingSectionEntryList: []
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    componentWillMount(){
        this.getRankingSectionEntries(this.props);
    }

    componentWillReceiveProps(props){
        this.getRankingSectionEntries(props);
    }

    getRankingSectionEntries(props){
        for (var i = 0; i < props.RankingSections.length ; i++){
            for (var j = 0; j < props.Ranking.RankingSectionEntries.length; j++){
                if (props.RankingSections[i].id === props.Ranking.RankingSectionEntries[j].ranking_section_id){
                    let rankingSectionEntry = (
                        <Table.Row key={i}>
                            <Table.Cell width={8}>
                                {props.RankingSections[i].name}
                            </Table.Cell>
                            <Table.Cell width={8}>
                                {props.Ranking.RankingSectionEntries[j].mark}
                            </Table.Cell>
                        </Table.Row>
                    );

                    this.state.rankingSectionEntryList.push(rankingSectionEntry);
                }
            }

            this.forceUpdate();
        }
    }

    render() {
        if (this.state.rankingSectionEntryList.length === 0 ) {
            return(
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
                        <div>This student has choosen to remain to keep their marks hidden or there's no ranking sections added</div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Actions>
                </Modal>
            );
        }

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
                                <Table.HeaderCell>Asessment Section Name</Table.HeaderCell>
                                <Table.HeaderCell>Mark</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.rankingSectionEntryList}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

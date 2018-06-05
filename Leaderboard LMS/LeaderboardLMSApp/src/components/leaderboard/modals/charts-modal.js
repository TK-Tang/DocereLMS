import React from "react";
import {Modal, Button, Icon} from "semantic-ui-react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default class ChartModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            options: {
                title: { text: "Mark Distribution" },
                xAxis: {
                    categories: []
                },
                series:[
                    {
                        type: "line",
                        name: "Students",
                        data: []
                    }
                ]
            }
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    componentWillMount(){
        var marks = [];
        var username = [];

        for (var i = 0; i < this.props.leaderboard.Rankings.length; i++){
            marks.push(this.props.leaderboard.Rankings[i].mark);
            if (!this.props.leaderboard.Rankings[i].User.username){
                username.push(this.props.leaderboard.Rankings[i].User.username);
            } else {
                username.push(this.props.leaderboard.Rankings[i].User.email);
            }
            
        }
        
        var options = this.state.options;
        options.series[0].data = marks.reverse();
        options.xAxis.categories = username;
        this.setState({options: options});
    }

    render(){
        console.log(this.props.leaderboard);
        return (
            <Modal
                closeIcon
                onClose={this.closeModal}
                size="large"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button floated="left" onClick={this.openModal}><Icon name="area chart" />Charts</Button>}
            >
                <Modal.Header>
                    Leaderboard Charts
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.options}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
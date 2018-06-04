import React from "react";
import {Modal, Button, Icon, Table, Form, Label} from "semantic-ui-react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import LineChart from "./charts-modal.js";

export default class ChartModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            options: {
                title: {
                  text: 'My chart'
                },
                series: [{data: [1, 2, 3]}]
            }
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    render(){
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
import React from "react";
import {Segment, Grid, Divider, Icon, Button} from "semantic-ui-react";

import ResourceAPI from "../../services/resource-api";

import DeleteDownloadModal from "./modals/delete-download-modal";
import CreateUploadModal from "./modals/create-upload-modal";

export default class Download extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            download: null,
            downloadList: []
        }
    }

    retrieveDownloads(course_id, category_id){
        ResourceAPI.get_resources(course_id, category_id).then((res) => {
            if (res.status === "success"){
                this.setState({download: res.payload});

                for (var i = 0; i < res.payload.length; i++){
                    let r = res.payload[i];
                    
                    let resource = (
                        <Grid.Row key={i}>
                            <Grid.Column width={3}>
                                <Segment color="teal" style={{height: "45px"}}>
                                    <Icon name="file text outline" size="large"/>
                                    <b>{r.name}</b>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <Segment color="blue" style={{height: "45px"}}>{r.description}</Segment>
                            </Grid.Column>
                            <Button primary style={{height: "40px"}}>
                                <Icon name="download" size="large"/>
                                Download
                            </Button>
                            
                            <DeleteDownloadModal />
                        </Grid.Row>
                    );

                    this.state.downloadList.push(resource);
                }

                this.forceUpdate();
            }
        });
    }

    componentWillMount(){
        if (!this.props.course_id){ return; }

        var category_id = this.props.match.params.category_id;
        this.state.downloadList = [];

        this.retrieveDownloads(this.props.course_id, category_id);
    }

    componentWillReceiveProps(newProps){
        if (!newProps.course_id){ return; }

        var category_id = newProps.match.params.category_id;
        this.state.downloadList = [];

        this.retrieveDownloads(newProps.course_id, category_id);
    }

    render(){
        if (!this.state.download){ return(""); }

        if (this.state.downloadList.length === 0){
            return (
                <div>
                    <Divider />
                    <Segment basic textAlign="center">
                        There is no content in this download category.
                    </Segment>
                </div>
            )
        }

        return (
            <div>
                <Divider />
                    <Grid>
                        {this.state.downloadList}
                    </Grid>
                <Divider />
                <Button color="green">Upload New File</Button>
                <CreateUploadModal />
            </div>
        );
    }
}
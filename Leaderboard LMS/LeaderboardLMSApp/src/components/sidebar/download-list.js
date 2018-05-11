import React from "react";
import {Menu, Icon} from "semantic-ui-react";

import CourseAPI from "../../services/course-api";

export default class DownloadList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            downloadList: []
        }
    }

    toggleDownloadListDisplay(){
        this.setState({hideDownloadList: !this.state.hideDownloadList});
    }

    componentWillReceiveProps(props) {
        if(props.course_id === 0){ return; };
        this.setState({ downloadList: []});

        CourseAPI.get_courseDownloads(props.course_id).then((res) => {
            if (res.status === "success"){
                for (var i = 0; i < res.payload.Categories.length; i++){
                    let download = (
                        <Menu.Item key={i} className="download-menu">
                            {res.payload.Categories[i].name.toUpperCase()}
                        </Menu.Item>
                    );

                    this.state.downloadList.push(download);
                }

                this.forceUpdate();
            } else {
                let message = "Downloads could not be loaded";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 2000});
            }
        });
    }

    render() {
        return (
            <Menu.Item>
                <div className="course-menu-category" onClick={this.toggleDownloadListDisplay.bind(this)}><Icon name="chevron right" />  DOWNLOADS <Icon disabled name="book" /></div>
                <br/>
                <div className={this.state.hideDownloadList ? "void" : ""}>
                    <div>
                        {this.state.downloadList}
                    </div>
                </div>
            </Menu.Item>
        );
    }
}
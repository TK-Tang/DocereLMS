import React from "react";
import {Segment, Comment, Header, Divider, Grid, Form, TextArea} from "semantic-ui-react";

import ChannelAPI from "../../services/channel-api";

export default class Channel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            channel: null,
            chatList: []
        };
    }

    retrieveChannel(course_id, channel_id){
        ChannelAPI.get_channel(course_id, channel_id).then((res) => {
            if (res.status === "success"){
                this.setState({channel: res.payload});

                for (var i = 0; i < res.payload.Chats.length; i++){
                    let c = res.payload.Chats[i];

                    let chat = (
                        <div key={i}>
                            <Comment>
                                <Comment.Avatar src={c.User.profilePictureLink}/>
                                <Comment.Content>
                                    <Comment.Author>{c.User.username}</Comment.Author>
                                    <Comment.Metadata><div>Sent at {c.created_at.substring(0, 10)}</div></Comment.Metadata>
                                    <Comment.Text>{c.message}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                            <Divider/>
                        </div>
                    );

                    this.state.chatList.push(chat);
                }

                this.forceUpdate();
            }
        });
    }

    componentWillMount(){
        if (!this.props.course_id){ return; }

        var channel_id = this.props.match.params.channel_id;
        this.state.chatList = [];

        this.retrieveChannel(this.props.course_id, channel_id);
    }

    componentWillReceiveProps(newProps){
        if (!newProps.course_id){ return; }

        var channel_id = newProps.match.params.channel_id;
        this.state.chatList = [];

        this.retrieveChannel(newProps.course_id, channel_id);
    }

    render() {
        if (!this.state.channel){ return(""); }

        if (this.state.chatList.length === 0){ return (
            <Grid>
                <Grid.Column width={14}>
                    <Divider />
                    <Segment color="teal">
                        <Header>{this.state.channel.name}</Header>
                        {this.state.channel.description}
                    </Segment>
                    <Divider />
                    <Segment basic textAlign="center">
                        No chat messages in this channel. Be the first one to say something here.
                    </Segment>
                </Grid.Column>
            </Grid>
        )};

        return(
            <div className="ui bottom attached pushable">
                <div className="pusher">
                    <Grid>
                        <Grid.Column width={14}>
                            <Divider />
                            <Segment color="teal">
                                <Header>{this.state.channel.name}</Header>
                                {this.state.channel.description}
                            </Segment>
                            <Comment.Group>
                                
                                {this.state.chatList}
                            </Comment.Group>

                            <Form>
                                <TextArea placeholder="Message this channel" />
                            </Form>
                            <Divider />
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );
    }
}

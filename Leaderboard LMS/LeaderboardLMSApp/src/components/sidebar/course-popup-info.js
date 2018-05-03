import React from "react";
import { Popup, Transition, Image } from "semantic-ui-react";

export default class CoursePopUpInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visibility: true,
            duration: 200
        }
    }

    toggleVisibility = () => { this.setState({visibility: !this.state.visibility})};

    render(){
        return (
            <Popup trigger={
                <div>
                    <Transition animation="jiggle" duration={this.state.duration} visible={this.state.visibility}>
                        <Image 
                            src={this.props.course.pictureLink}
                            shape="rounded"
                            height="50px"
                            width="50px"
                            style={{display:"inline-block"}}
                            onMouseEnter = {this.toggleVisibility}
                        />
                    </Transition>
                </div>}
            >
                <Popup.Header>{this.props.course.name}</Popup.Header>
                <Popup.Content>
                    {this.props.course.description}
                </Popup.Content>
            </Popup>
        );
    }
}
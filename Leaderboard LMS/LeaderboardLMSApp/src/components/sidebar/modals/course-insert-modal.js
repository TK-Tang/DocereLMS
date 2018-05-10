import React from "react";
import {Modal, Button, Image, Header, Label, Form, Input, Icon} from "semantic-ui-react";

export default class CourseInsertModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            name: "",
            description: "",
            pictureLink: "",
            defaultPictureLink: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/book-icon.png"
        }
    }

    updateName(e){
        this.setState({name: e.target.value});
    }

    updateDescription(e){
        this.setState({description: e.target.value});
    }

    updatePictureLink(e){
        this.setState({pictureLink: e.target.value});
    }

    render(){
        return (
            <Modal
                closeIcon
                size="small"
                trigger={<Icon className="add-course-icon" name="add square"/>}
            >
                <Modal.Header>
                    Create New Course
                </Modal.Header>
                <Modal.Content image>
                    <Image
                        bordered={true}
                        wrapped
                        size="small"
                        src={!this.state.pictureLink ? "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/book-icon.png" : this.state.pictureLink}
                    />

                    <Modal.Description style={{width: "60%"}}>
                        <Form>
                            <Form.Field width="16">
                                <Label>Name:</Label>
                                <Input  onChange={this.updateName.bind(this)} value={this.state.name} placeholder="Name of your new course"/>
                            </Form.Field>
                            <Form.Field width="16">
                                <Label>Description:</Label>
                                <Input onChange={this.updateDescription.bind(this)} value={this.state.description} placeholder="Description of your new course" />
                            </Form.Field>
                            <Form.Field width="16">
                                <Label>Icon Link:</Label>
                                <Input onChange={this.updatePictureLink.bind(this)} value={this.state.pictureLink} placeholder="Link to icon picture for your course"/>
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>Create</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
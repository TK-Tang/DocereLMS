import React from "react";
import {Modal, Button, Label, Form, Segment, Icon, Input, TextArea} from "semantic-ui-react";


export default class CreateUploadModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false
        }
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    render(){
        return(
            <Modal
                closeIcon
                onClose={this.closeModal}
                size="small"
                dimmer={true}
                open={this.state.modal}
                trigger={<Button color="green" onClick={this.openModal}><Icon name="upload" />Create New Submission Point</Button>}
            >
                <Modal.Header>
                    Create Upload File Entry
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <Form.Input width={4} label="Upload Entry Name"/>
                                <Form.Input
                                    width={12}
                                    label="Directory Destination"
                                    action={{color: "teal", labelPosition: "right", icon: "file", content: "Choose Directory"}}
                                    defaultValue="C:/Users/Admin/Uploads"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea label="Description" width={16}/>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>Create Upload</Button>
                    <Button onClick={this.closeModal}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
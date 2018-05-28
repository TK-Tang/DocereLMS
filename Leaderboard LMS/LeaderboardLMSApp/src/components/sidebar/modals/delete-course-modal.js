import React from "react";
import {Header, Icon, Button, Modal} from "semantic-ui-react";

export default class DeleteCourseModal extends React.Component {
    render(){
        return (
            <Modal
                trigger={<Button color="red" floated="left">Delete</Button>}
                basic
                size="small"
            >
                <Header icon="trash outline" content="Delete Course"/>
                <Modal.Content>
                    <p>Are you sure you want to delete this course? It cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted>
                        <Icon name="trash outline" />Delete Course
                    </Button>
                    <Button color="green" inverted>
                        <Icon name="share"/>Go Back
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
import React from "react";
import {Header, Icon, Button, Modal} from "semantic-ui-react";

export default class DeleteDownloadModal extends React.Component {
    render(){
        return (
            <Modal
                basic
                size="small"
                trigger={<Button color="red" style={{height: "40px"}}>
                            <Icon name="trash outline" size="large"/>
                            Delete
                        </Button>}
            >
             <Header icon="trash outline" content="Delete File"/>
                <Modal.Content>
                    <p>Are you sure you want to delete this file download point? It cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted>
                        <Icon name="trash outline" />Delete File
                    </Button>
                    <Button color="green" inverted>
                        <Icon name="share"/>Go Back
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
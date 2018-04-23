import React from "react";
import {Button, Image, Icon, Form} from "semantic-ui-react";

// require("velocity-animate");
// require("velocity-animate/velocity.ui");
// var VelocityTransitionGroup = require("velocity-react").VelocityTransitionGroup;

export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            signupComplete: false,
            email: "",
            password: "",
        }
    }

    componentWillMount() {
        this.props.history.replace('/auth/signup');
    }
    
    updateEmail(e){
        this.setState({email: e.target.value});
    }

    updatePassword(e){
        this.setState({password: e.target.value});
    }

    render(){
        return (
            <div className="text-centre">
                <div className={(this.state.loginComplete) ? "appear intro-logo" : "disappear intro-logo"}>
                    <Icon.Group size="huge" className="icon-group">
                        <Icon className="white-color" size="big" name="checkmark" />
                    </Icon.Group>
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <h5 className="intro-h4">Signing you up!</h5>
                </div>

                <div className={(this.state.loginComplete) ? "disappear intro-logging-in" : "appear intro-logging-in"}>
                    <Image 
                        src="/assets/img/icons/icon.png"
                        size="small"
                        shape="rounded"
                        style={{display:"inline-block"}}
                    />
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <h5 className="intro-h4">You've been invited to a course! Sign up here!</h5>
                    <Form className="intro-form">
                        <Form.Group widths="equal">
                            <Form.Input id="form-subcomponent-shorthand-input-user-name" onChange={this.updateEmail.bind(this)} placeholder="Email" value={this.state.email} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" id="form-subcomponent-shorthand-input-password" onChange={this.updatePassword.bind(this)} placeholder="Password" value={this.state.password}/>
                        </Form.Group>
                        <Button positive className="width-full">Login</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
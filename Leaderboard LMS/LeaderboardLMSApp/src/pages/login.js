import React from "react";
import {Sidebar, Segment, Button, Menu, Image, Icon, Header, Form} from "semantic-ui-react";
import {Link, browserHistory} from "react-router";

import AuthAPI from "../services/authentication-api";

require('velocity-animate');
require('velocity-animate/velocity.ui');

var VelocityTransitionGroup= require('velocity-react').VelocityTransitionGroup;

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginComplete: false,
            email: "",
            password: "",
            errors: []
        };
    }

    componentWillMount(){ }

    login(){
        let loginInfo = {
            email: this.state.email,
            password: this.state.password
        }
        AuthAPI.signin(loginInfo).then((res) => {
            console.log(res);
            if (res.status === "success"){
                let message = "Successfully logged in!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });
            }
        });
        this.setState({ loginComplete: true });
        setTimeout(function(){
            browserHistory.push("/landing");
        }.bind(this), 2000);
    }

    updateEmail(e){
        this.setState({email: e.target.value});
    }

    updatePassword(e){
        this.setState({password: e.target.value});
    }

    render(){
        return(
            <div className="text-centre">
                <div className={(this.state.loginComplete) ? "appear intro-logo" : "disappear intro-logo"}>
                    <Icon.Group size="huge" className="icon-group">
                        <Icon className="white-color" size="big" name="checkmark" />
                    </Icon.Group>
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                </div>

                <div className={(this.state.loginComplete) ? "disappear intro-logging-in" : "appear intro-logging-in"}>
                    <Image 
                        src="/assets/img/icons/icon.png"
                        size="small"
                        shape="rounded"
                        style={{display:"inline-block"}}
                    />
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <Form className="intro-form">
                        <Form.Group widths="equal">
                            <Form.Input id="form-subcomponent-shorthand-input-user-name" onChange={this.updateEmail.bind(this)} placeholder="Email" value={this.state.email} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" id="form-subcomponent-shorthand-input-password" onChange={this.updatePassword.bind(this)} placeholder="Password" value={this.state.password}/>
                        </Form.Group>
                        <Button positive className="width-full" onClick={this.login.bind(this)}>Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}


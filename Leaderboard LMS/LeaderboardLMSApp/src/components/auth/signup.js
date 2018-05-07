import React from "react";
import {Button, Image, Icon, Form} from "semantic-ui-react";

import AuthAPI from "../../services/authentication-api";

export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            invitationValidity: true,
            signupComplete: false,
            email: "",
            password: "",
            passwordCheck: ""
        }
    }

    componentDidMount() {
        var invitation = this.props.match.params.invitation;
        AuthAPI.get_signup(invitation).then((res) => {
            console.log(res);
            if (res.status === "success"){
                let message = "You have been invited to join an academic server on LeaderboardLMS. You will need to sign up first.";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });
                this.setState({ invitationValidity: true})
                return;
            } else if (res.status === "fail"){
                let message = "This invitation is not invalid. It may have been deleted or expired.";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
                this.setState({ invitationValidity: false})
                return;
            }
        });
    }
    
    updateEmail(e){
        this.setState({email: e.target.value});
    }

    updatePassword(e){
        this.setState({password: e.target.value});
    }

    updatePasswordCheck(e){
        this.setState({passwordCheck: e.target.value});
    }

    signin(){
        this.props.history.replace('/');
    }

    signup(){
        if (this.state.password !== this.state.passwordCheck){
            let message = "The passwords you have entered do not match";
            window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
            return;
        }

        let signupInfo = {
            email: this.state.email,
            password: this.state.password
        }

        var invitation = this.props.match.params.invitation;
        AuthAPI.put_signup(signupInfo, invitation).then((res) => {
            if (res.status === "success"){
                let message = "Successfully registered and signed in - welcome to LeaderboardLMS!";
                window.Alert.success(message, {position: "top", effect: "stackslide", timeout: 4000 });

                this.setState({ signupComplete: true });
                setTimeout(function(){ this.props.history.replace("/landing"); }.bind(this), 4000);
            } else if (res.status === "fail") {
                let message = "That email is already taken. Please choose another.";
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
            } else {
                let message = "There was an issue with signing up"
                window.Alert.error(message, {position: "top", effect: "stackslide", timeout: 4000 });
            }
        })
    }

    render(){
        return (
            <div className="text-centre">
                <div className={(this.state.signupComplete) ? "appear intro-signup" : "disappear intro-signup"}>
                    <Icon.Group size="huge" className="icon-group">
                        <Icon className="white-color" size="big" name="checkmark" />
                    </Icon.Group>
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <h5 className="intro-h4">Signing you up!</h5>
                </div>
                
                <div className={(this.state.signupComplete) ? "disappear intro-signing-up" : "appear intro-signing-up"}>
                    <Image 
                        src="/img/icons/icon.png"
                        size="small"
                        shape="rounded"
                        style={{display:"inline-block"}}
                    />
                    <h4 className="intro-h4">Welcome to Leaderboard Learning Management System</h4>
                    <div className={(this.state.invitationValidity) ? "visibility-hidden" : ""}>
                        <h5 className="error-h4 red">This invitation is invalid D:</h5>
                    </div>
                    <h5 className={(this.state.invitationValidity) ? "intro-h4" : "visibility-hidden"}>You've been invited to join a course with other peers</h5>
                    <Form className="intro-form">
                        <Form.Group widths="equal">
                            <Form.Input id="form-subcomponent-shorthand-input-user-name" onChange={this.updateEmail.bind(this)} placeholder="Email" value={this.state.email} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" id="form-subcomponent-shorthand-input-password" onChange={this.updatePassword.bind(this)} placeholder="Password" value={this.state.password}/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="password" onChange={this.updatePasswordCheck.bind(this)} placeholder="Confirm Password" value={this.state.passwordCheck}/>
                        </Form.Group>
                        <Button positive className={(this.state.invitationValidity) ? "width-full" : "width-full disabled"} onClick={this.signup.bind(this)}>Sign up and accept invitation</Button>
                        <Button positive className="width-full margin-top-small" onClick={this.signin.bind(this)}>Sign in here</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

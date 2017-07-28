import React, { Component, PropTypes } from 'react';
import { Label, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'

class SignIn extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        onLogin: PropTypes.func.isRequired
    };

    handleLogin() {
        const { onLogin } = this.props;
        const username = this.refs.username.value;

        onLogin({ username, loggedIn: true });

        this.props.router.push('/loggedin');
    }

    render() {
        return (
            <Row>
                <Row>
                    <Text>Already a member?</Text>
                    <Text> Sign In! </Text>
                </Row>
                <Row style={{display: 'inline-block'}}>
                    <TextInput
                        ref="username"
                        label="User Name Or Email"
                    />
                    <TextInput
                        ref="passwd"
                        label="Password"
                        password
                    />
                </Row>
                <Row>
                    <Button onClick={::this.handleLogin}>
                        Sign In
                    </Button>
                </Row>
            </Row>
        )
    }
}

export default SignIn

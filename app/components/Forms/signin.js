import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Label, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'

class SignIn extends Component {
    constructor(props) {
        super(props)
    }

    handleLogin() {
        const { dispatch } = this.props;
        const username = this.refs.username.value;
        const password = this.refs.passwd.value;

        dispatch({type: 'LOGIN', payload: {username, password}});

        this.props.history.push('/admin');
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

const mapStateToProps = state => ({
    creds: state
})

export default connect(mapStateToProps)(SignIn)

import React, { Component, PropTypes } from 'react';
import { Label, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'

class SignUp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                <Row>
                    <Text>Create a new account</Text>
                </Row>
                <Row>
                    <TextInput
                        ref="username"
                        label="User Name"
                    />
                    <TextInput
                        ref="passwd"
                        label="Password"
                        password
                    />
                    <TextInput
                        ref="passwd2"
                        label="Re-type Password"
                        password
                    />
                    <TextInput
                        ref="email" 
                        label="Email"
                    />
                    <TextInput
                        ref="number" label="Phone Number"
                    />

                    <Row>
                        <Col md={6}>
                            <Button>
                                Add Admin
                            </Button>
                        </Col>

                        <Col md={6}>
                            <Button>
                                Add User
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Row>
        )
    }
}

export default SignUp

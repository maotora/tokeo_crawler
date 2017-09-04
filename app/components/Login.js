import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system'
import SignIn from './Pages/users/signin'
import { connect } from 'react-redux'
import SignUp from './Pages/users/signup'
import { SignupText, SigninText } from './Pages/users/ui'

class Login extends Component {
    constructor(props) {
        super(props)
    }

    renderForm() {
        if(this.props.users.length > 0) {
            return (
                <Row>
                    <Col md={6}>
                        <SignIn {...this.props} />
                    </Col>

                    <Col md={6}>
                        <SigninText {...this.props} />
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col md={6}>
                        <SignUp {...this.props} />
                    </Col>
                    <Col md={6}>
                        <SignupText {...this.props} />
                    </Col>
                </Row>
            )
        }
    }

    render() {
        return (
            <Col style={{marginTop: 30}}>
                {this.renderForm()}
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(Login)

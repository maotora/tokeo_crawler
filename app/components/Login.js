import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system'
import SignIn from './Pages/users/signin'
import { connect } from 'react-redux'
import SignUp from './Pages/users/signup'
import { SignupText, SigninText } from './Pages/users/ui'
const imgSource = './assets/img/login.png'

class Login extends Component {
    constructor(props) {
        super(props)
    }

    renderForm() {
        if(this.props.users.length > 0) {
            return (
                <Row>
                    <Col md={8}>
                        <SignIn {...this.props} />
                    </Col>

                    <Col style={styles.bg} md={4}></Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col md={6}>
                        <SignUp {...this.props} />
                    </Col>
                    <Col style={styles.bg} md={6}></Col>
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

const styles = {
    bg: {
        height: 500,
        backgroundImage: `url(${imgSource})`,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(33, 182, 182, .8)',

    },
}

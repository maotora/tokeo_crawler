import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import SignInForm from '../../Forms/Auth/signinForm'
import RegisteredForm from '../../Forms/Auth/signinRegisteredForm'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null
        }
    }

    submit(values) {
        const { username, password } = values
        this.props.dispatch({type: 'TO_LOGIN', payload: {username, password}})
    }

    submitRegistered(values) {
        const { license, username, password } = values
        this.props.dispatch({type: 'DATA_DOWNLOAD', payload: {businessId: license}})
        this.setState({username, password})
        this.props.dispatch({type: 'TOGGLE_REG'})
    }

    componentWillMount() {
        /*
         * After SIGNUP app gets routed to this component
         * which is uneccessary as the user is already logged!
        */
        if(this.props.auth.logged) {
            this.props.history.push('/admin')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.users.length > 0 && this.state.username) {
            this.props.dispatch({
                type: 'TO_LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        } 

        if(nextProps.users.length > 0 && nextProps.auth.logged) {
            this.props.history.push('/admin')
        }
    }

    renderSignIn() {
        if(this.props.registered) {
            return (
                <View width="100%" horizontalAlignment="center">
                    <RegisteredForm {...this.props} onSubmit={::this.submitRegistered} />
                </View>
            )
        } else {
            return (
                <View width="100%" horizontalAlignment="center">
                    <SignInForm {...this.props} onSubmit={::this.submit} />
                </View>
            )
        }
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}>Sign In Form</Text>
                    </View>
                </Row>

                <Row>
                    {this.renderSignIn()}
                </Row>
            </Container>
        )
    }
}

const styles = {
    header: {
        fontSize: 24,
        lineHeight: 3,
        fontWeight: 320,
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    registered: state.registered,
    users: state.users,
})

export default connect(mapStateToProps)(SignIn)

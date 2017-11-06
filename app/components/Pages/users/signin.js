import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import SignInForm from '../../Forms/Auth/signinForm'

class SignIn extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
        const { username, password } = values
        this.props.dispatch({type: 'TO_LOGIN', payload: {username, password}})
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
        if(nextProps.auth.logged) {
            this.props.history.push('/admin')
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
                    <View width="100%" horizontalAlignment="center">
                        <SignInForm {...this.props} onSubmit={::this.submit} />
                    </View>
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
    auth: state.auth
})

export default connect(mapStateToProps)(SignIn)

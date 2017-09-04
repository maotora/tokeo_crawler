import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import SignUp from '../../Forms/signupForm'

const selector = formValueSelector('sign_up')
const reduxCfg = state => {
	let togglePassword = selector(state, 'passwordToggle')
	togglePassword = !!togglePassword
	return {togglePassword}
}

class Signup extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'SIGNUP', payload: values})
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}>Signup Form</Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <SignUp {...this.props} onSubmit={::this.submit} />
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

export default connect(reduxCfg)(Signup)

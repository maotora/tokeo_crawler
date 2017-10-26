import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import AddAdminForm from '../../Forms/Admin/addAdminForm'

const selector = formValueSelector('add_admin')
const reduxCfg = state => {
	let togglePassword = selector(state, 'passwordToggle')
	togglePassword = !!togglePassword
	return {togglePassword}
}


class AddAdmin extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'TO_ADD_USER', payload: values})
		this.props.history.push('/admin')
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}> Add Admin Form </Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <AddAdminForm {...this.props} onSubmit={::this.submit} />
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

export default connect(reduxCfg)(AddAdmin)

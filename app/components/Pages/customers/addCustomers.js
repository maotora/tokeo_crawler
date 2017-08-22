import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import AddCustomersForm from '../../Forms/addCustomersForm'

class AddCustomers extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
        this.props.dispatch({type: 'TO_ADD_CUSTOMER', payload: values})
        this.props.history.push('/admin')
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}> Add Customers Form </Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <AddCustomersForm {...this.props} onSubmit={::this.submit} />
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

export default connect()(AddCustomers)

import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import EditCustomersForm from '../../Forms/editCustomerForm'

class EditCustomers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    submit(values) {
        values.index = this.state.index
        this.props.dispatch({type: 'TO_EDIT_CUSTOMER', payload: values})
        this.props.history.push('/admin')
    }

    getIndex(index) {
        if(index !== this.state.index) {
            this.setState({index})
        }
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}> Edit Customers Form </Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <EditCustomersForm getIndex={::this.getIndex} {...this.props} onSubmit={::this.submit} />
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

export default connect()(EditCustomers)


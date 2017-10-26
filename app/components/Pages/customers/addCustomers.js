import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import AddCustomersForm from '../../Forms/Customers/addCustomersForm'
import toastr from 'toastr'

const selector = formValueSelector('add_customer')
const reduxCfg = state => {
	let minDate = selector(state, 'startDate')
	return {minDate}
}

class AddCustomers extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
        this.props.dispatch({type: 'TO_ADD_CUSTOMER', payload: values})
        this.props.history.push('/admin')
    }

    componentWillMount() {
        const { properties } = this.props

        if(properties.length === 0) {
            toastr.error('You need more properties first!', 'Cannot add customer')
            this.props.dispatch({type: 'DASHBOARD_SELECTION', payload: {selection: 'Properties'}})
            this.props.history.push('/admin')
        }
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

const mapStateToProps = state => {
    const properties = state.properties.filter(property => {
        if(!property.deleted && property.status !== 'Occupied') {
            return property
        }
    })

    return {properties}
}

const connectedComponent = connect(reduxCfg)(AddCustomers)
export default connect(mapStateToProps)(connectedComponent)

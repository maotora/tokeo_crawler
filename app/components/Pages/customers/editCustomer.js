import React, { Component } from 'react'
import { Text, Buttom, TextInput, Label, View } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import EditCustomersForm from '../../Forms/Customers/editCustomerForm'
import Paymentsform from '../../Forms/Payments/paymentsForm'
import RenewalForm from '../../Forms/Payments/renewalForm'
import toastr from 'toastr'

const selector = formValueSelector('edit_customer')
const reduxCfg = state => {
	let minDate = selector(state, 'startDate')
	return {minDate}
}

class EditCustomers extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
        this.props.dispatch({type: 'TO_EDIT_CUSTOMER', payload: values})
        this.props.history.push('/admin')
    }

    submitPayments(values) {
        this.props.dispatch({type: 'TO_EDIT_CUSTOMER', payload: values})
    }

    componentWillMount() {
        const {users} = this.props
        const authId = this.props.auth.id
        const isModerator = users.find(user => user.role === 'moderator' && user.id === authId)

        if(isModerator) {
            toastr.error('Moderator cannot edit anything!', 'Roles restrictions')
            this.props.history.goBack()
        } else {
            return
        }
    }

    renderForm() {
        if(this.props.update) {
            return (
                <Col>
                    <Row>
                        <View width="100%" horizontalAlignment="center">
                            <Text style={styles.header}> Update Customer Payments </Text>
                        </View>
                    </Row>
                    <Row>
                        <View width="100%" horizontalAlignment="center">
                            <Paymentsform {...this.props} onSubmit={::this.submitPayments} />
                        </View>
                    </Row>
                </Col>
            )
            } else if(this.props.renew) {
                return (
                    <Col>
                        <Row>
                            <View width="100%" horizontalAlignment="center">
                                <Text style={styles.header}> Update Customer Payments </Text>
                            </View>
                        </Row>
                        <Row>
                            <View width="100%" horizontalAlignment="center">
                                <RenewalForm {...this.props} onSubmit={::this.submitPayments} />
                            </View>
                        </Row>
                    </Col>
                )
            } else {
            return (
                <Col>
                    <Row>
                        <View width="100%" horizontalAlignment="center">
                            <Text style={styles.header}> Edit Customers Form </Text>
                        </View>
                    </Row>
                    <Row>
                        <View width="100%" horizontalAlignment="center">
                            <EditCustomersForm {...this.props} onSubmit={::this.submit} />
                        </View>
                    </Row>
                </Col>
            )
        }
    }

    render() {
        return (
            <Container className="container-fluid">
                {this.renderForm()}
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
    users: state.users.filter(user => user && !user.deleted),
    auth: state.auth,
})

export default connect(mapStateToProps)(connect(reduxCfg)(EditCustomers))

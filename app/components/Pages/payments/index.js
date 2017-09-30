import React, { Component } from 'react';
import { View, NavPaneItem, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import * as icons from 'react-icons/lib/fa'
import Profile from './profile'
import Contracts from '../contracts'
import Header from '../Dashboard/header'
import UpdateCustomer from '../customers/editCustomer'
import docxTemplating from './lib'

const selector = formValueSelector('customer_renewal')
const reduxCfg = state => {
	let minDate = selector(state, 'startDate')
	return {minDate}
}

class Payments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdate: false,
            showRenew: false,
        }
    }

    goBack() {
        this.props.history.push('/admin')
    }

    render() {
        return (
            <Col>
                <Row style={{marginTop: 10}}>
                    <Col md={2}>
                        <button style={{border: 0}} className="btn btn-default btn-lg" onClick={::this.goBack}>
                            {icons.FaArrowLeft()}
                        </button>
                    </Col>
                    <Col md={10}>
                        <Header pageName="Payments Page" {...this.props} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Profile {...this.props} />
                        </Row>
                        <Row>
                            <Col md={3}>
                                <button className="btn btn-primary"
                                    onClick={() => this.renewContract()}
                                > 
                                    Renew Contract
                                </button>
                            </Col>
                            <Col md={3}>
                                <button className="btn btn-info"
                                    onClick={() => this.updateContract()}
                                > 
                                    Update Contract 
                                </button>
                            </Col>
                            <Col md={3}>
                                <button className="btn btn-success"
                                    onClick={() => this.generateContract()}
                                > 
                                    Generate Contract
                                </button>
                            </Col>
                                {this.props.customer.payments &&
                                    <Col md={3}>
                                        <button className="btn btn-success"
                                            onClick={() => this.emailContract()}
                                        > 
                                            Email contract
                                        </button>
                                    </Col>
                                }
                        </Row>
                    </Col>
                    <Col md={6}>
                        {this.renderForm()}
                    </Col>
                </Row>
            </Col>
        )
    }

    renderForm() {
        if(this.state.showUpdate) {
            return <UpdateCustomer update={true} {...this.props} />
        } else if(this.state.showRenew) {
            return <UpdateCustomer renew={true} {...this.props} />
        }
    }

    updateContract() {
        this.setState({
            showUpdate: !this.state.showUpdate,
            showRenew: false,
        })
    }

    generateContract() {
        const outputPath = docxTemplating(this.props)

        if(outputPath) {
            const payments = [...this.props.customer.payments || {}, {
                contractUrl: outputPath,
                contractCreated: new Date().getTime(),
            }]

            const values = {
                ...this.props.customer,
                payments,
            }

            this.props.dispatch({type: 'TO_EDIT_CUSTOMER', payload: values})
        }
    }

    renewContract() {
        this.setState({
            showRenew: !this.state.showRenew,
            showUpdate: false,
        })
    }

    emailContract() {
        const {customer} = this.props
        this.props.dispatch({type: 'EMAIL_CONTRACT', payload: customer})
    }
}


const mapStateToProps = state => {
    const {id} = state.customerTempEdits
    const customers = state.customers
    const properties = state.properties
    const users = state.users
    const customer = customers.filter(customer => customer.id === id)[0]

    return {
        auth: state.auth,
        customer,
        properties,
        customers,
        users,
        id,
    }
}

const connectedState = connect(reduxCfg)(Payments)
export default connect(mapStateToProps)(connectedState)

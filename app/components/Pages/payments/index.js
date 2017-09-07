import React, { Component } from 'react';
import { View, NavPaneItem, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { remote } from 'electron'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import Profile from './profile'
import Contracts from '../contracts'
import Header from '../Dashboard/header'
import UpdateCustomer from '../customers/editCustomer'
import docxTemplating from './lib'

class Payments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'Profile',
            showUpdate: false,
            showRenew: false,
        }
    }

    goBack() {
        this.props.history.push('/admin')
    }

    render() {
        return (
            <Col style={{overflow: 'hidden', paddingLeft: 0}}>
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
                            <Col md={3}>
                                <button className="btn btn-danger"
                                    onClick={() => this.endContract()}
                                > 
                                    Terminate Contract
                                </button>
                            </Col>
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
        const { dispatch, index } = this.props
        const { dialog } = remote
        const file = dialog.showOpenDialog({
            title: 'Open Contract Template File',
            defaultPath: '$HOME',
            filters: [{name: 'Documents', extensions: ['doc', 'docx']}]
        })[0]

        docxTemplating(file)
    }

    renewContract() {
        this.setState({
            showRenew: !this.state.showRenew,
            showUpdate: false,
        })
    }

    endContract() {
        const { dispatch, index } = this.props
        console.log('Some prompt Ending amigoooo')
    }
}


const mapStateToProps = state => {
    const {id} = state.customerTempEdits
    const customers = state.customers
    const properties = state.properties

    return {
        auth: state.auth,
        customer: customers.filter(customer => customer.id === id)[0],
        properties
    }
}

export default connect(mapStateToProps)(Payments)

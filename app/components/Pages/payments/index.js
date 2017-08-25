import React, { Component } from 'react';
import { View, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import Profile from './profile'
import Contracts from '../contracts'
import Header from '../Dashboard/header'
import UpdateCustomer from '../customers/editCustomer'

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
                        <Col>
                            <Profile {...this.props.customer} />
                        </Col>
                        <Col>
                            <Col md={3}>
                                <button className="btn btn-primary"
                                    onClick={() => this.renewContract()}
                                > 
                                    Renew Contract
                                </button>
                            </Col>
                            <Col md={3}>
                                <button className="btn btn-success"
                                    onClick={() => this.updateContract()}
                                > 
                                    Update Contract 
                                </button>
                            </Col>
                            <Col md={3}>
                                <button className="btn btn-danger"
                                    onClick={() => this.endContract()}
                                > 
                                    Terminate Contract
                                </button>
                            </Col>
                        </Col>
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
            return <UpdateCustomer update={false} {...this.props} />
        }
    }

    updateContract() {
        this.setState({
            showUpdate: !this.state.showUpdate,
            showRenew: false,
        })
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


const mapStateToProps = state => ({
    customer: state.customerTempEdits,
    logged: state.login,
})

export default connect(mapStateToProps)(Payments)

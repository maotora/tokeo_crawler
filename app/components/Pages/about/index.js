import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import DeveloperProfile from './dev'
import CustomerProfile, {NoCustomerProfile} from './owner'
import Statements from './statements'

class About extends Component {
    constructor(props) {
        super(props)
    }

    renderCustomer(users) {
        if(users.length > 0) {
            return <CustomerProfile {...this.props} />
        } else {
            return <NoCustomerProfile />
        }
    }

    render() {
        return (
            <Col>
                <Header pageName="About" {...this.props} />

                <Col md={9}>
                    <Row>
                        <DeveloperProfile {...this.props} />
                        <hr />
                        {this.renderCustomer(this.props.users)}
                    </Row>

                    <View marginTop="20" horizontalAlignment="center" width="100%">
                        <Row>
                            <Statements {...this.props} />
                        </Row>
                    </View>
                </Col>
                <Col md={3}></Col>

            </Col>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.filter(user => !user.deleted && user.role === 'owner')
})

export default connect(mapStateToProps)(About)

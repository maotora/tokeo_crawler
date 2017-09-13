import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import DeveloperProfile from './dev'
import CustomerProfile from './owner'
import Statements from './statements'

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col>
                <Header pageName="About" {...this.props} />

                <Row>
                    <DeveloperProfile {...this.props} />
                    <hr />
                    <CustomerProfile {...this.props} />
                </Row>

                <View horizontalAlignment="center" width="100%">
                    <Row>
                        <Statements {...this.props} />
                    </Row>
                </View>

            </Col>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps)(About)

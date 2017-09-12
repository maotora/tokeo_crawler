import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col md={12}>
                <Header pageName="About" {...this.props} />
            </Col>
        )
    }
}

export default About

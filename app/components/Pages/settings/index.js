import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'
import FaCloudDownload from 'react-icons/lib/fa/cloud-download'

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col md={12}>
                <Header pageName="Settings" {...this.props} />

                <Row>
                    <Col md={6}>
                        <Col md={8}>
                            <Text> Download From Server </Text>
                        </Col>
                        <Col md={4}>
                            <FaCloudDownload />
                        </Col>
                    </Col>

                    <Col md={6}>
                        <Col md={8}>
                            <Text> Sync To Server </Text>
                        </Col>
                        <Col md={4}>
                            <FaCloudUpload />
                        </Col>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Settings

import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import * as icons from 'react-icons/lib/fa'
import smalltalk from 'smalltalk'

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    resetState() {
        smalltalk.confirm('Confirm reset', 'Are you sure you want to reset app?')
            .then(() => this.props.dispatch({type: 'CLEAR_ALL_DATA'}), () => console.log('Did\'nt reset data'))
    }

    render() {
        return (
            <Col md={12}>
                <Container>
                    <Header pageName="Settings" {...this.props} />
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Text style={{lineHeight: 2, fontSize: 16}}> Download from server &nbsp;&nbsp; {icons.FaDownload()} </Text>
                            </Row>

                            <Row>
                                <Button onClick={() => this.props.dispatch({type: 'DATA_DOWNLOAD'})} color="#D9EDF7" push >
                                    <Text>Download Data</Text>
                                </Button>
                            </Row>

                        </Col>

                        <Col md={6}>
                            <Row>
                                <Text style={{lineHeight: 2, fontSize: 16}}> Upload to server &nbsp;&nbsp; {icons.FaUpload()} </Text>
                            </Row>

                            <Row>
                                <Button onClick={() => this.props.dispatch({type: 'DATA_SYNC'})} color="#D9EDF7" push >
                                    <Text>Upload Data</Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 100}}>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Row>
                                <Button onClick={() => this.resetState()} color="red" push >
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, lineHeight: 2, padding: 14}}>Reset All Data</Text>
                                </Button>
                            </Row>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </Col>
        )
    }
}

export default connect()(Settings)

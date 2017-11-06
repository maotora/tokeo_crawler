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

    synchronize() {
        this.props.dispatch({type: 'DATA_SYNC'})
    }

    render() {
        return (
            <Col md={12}>
                <Container>
                    <Header pageName="Settings" {...this.props} />
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Text style={{lineHeight: 2, fontSize: 24}}>
                                    Synchronize Data
                                </Text>
                            </Row>
                        </Col>

                        <Col md={6}>
                            <Row>
                                <Text style={{lineHeight: 2, fontSize: 24}}>
                                    Reset Data
                                </Text>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Row>
                                <Button onClick={() => this.synchronize()} color="blue" push >
                                    <Text style={{padding: 10}}>
                                        <Text style={{color: 'white', fontSize: 16}}>Sync Data &nbsp; </Text>
                                        <Text style={{fontSize: 24, color: 'white'}}>{icons.FaMixcloud()}</Text>
                                    </Text>
                                </Button>
                            </Row>
                        </Col>

                        <Col md={6}>
                            <Row>
                                <Button onClick={() => this.resetState()} color="red" push >
                                    <Text style={{padding: 10}}>
                                        <Text style={{color: 'white', fontSize: 16}}>Reset Data &nbsp; </Text>
                                        <Text style={{fontSize: 24, color: 'white'}}>{icons.FaTrash()}</Text>
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <View horizontalAlignment="center">
                                <Text style={{lineHeight: 2, fontSize: 24, borderBottom: '2px solid black'}}> Information </Text>
                            </View>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Text style={{fontSize: 18, margin: 10, marginLeft: 0,}}> Synchronize Data &nbsp; <span> {icons.FaMixcloud()}</span></Text>
                            <Text style={{fontSize: 16, marginBottom: 5}}>
                                <Text> * Use &nbsp; <em style={{fontWeight: 'bold'}}>Sync Data</em> &nbsp; to upload & download data from server. </Text>
                            </Text>

                            <Text style={{fontSize: 16, marginBottom: 5}}>
                                By uploading you'll give your latest information to the server to let it send better messages with lower cost.
                            </Text>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}></Col>
                        <Col md={6}>
                            <p style={{fontSize: 18, margin: 10, textAlign: 'center'}}> <span> {icons.FaTrash()}</span> &nbsp; Reset Data </p>
                            <Text style={{fontSize: 16, marginBottom: 5}}>
                                <Text> * Use &nbsp; <em style={{fontWeight: 'bold'}}>Reset Data</em> &nbsp; to remove everything on your application state. </Text>
                            </Text>

                            <Text style={{fontSize: 16, marginBottom: 5}}>
                                Sometimes the program is slow and you want a fresh start, Resetting will give you that and you can sync data to get your information from server after.
                            </Text>

                            <Text style={{fontSize: 16, marginBottom: 5}}>
                                <em style={{fontWeight: 'bold', fontSize: 16}}>*&nbsp;*&nbsp;</em> 
                                It's a good habit to sync everything before reseting so you won't lose your offline data.
                            </Text>
                        </Col>
                    </Row>
                </Container>
            </Col>
        )
    }
}

export default connect()(Settings)

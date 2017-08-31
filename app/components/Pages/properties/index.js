import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, Text, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import PropertiesList from './list'
import Header from '../Dashboard/header'

class Property extends Component {
    constructor(props) {
        super(props)
    }

    addProperty() {
        this.props.history.push('/add_property')
    }

    render() {
        return (
            <Container>
                <Header pageName="Properties" {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <TextInput width="90%" placeholder="Search Properties" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button onClick={::this.addProperty} push={true} color="green">Add Property</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.title}> Our Properties List </Text>
                    </Col>
                </Row>
                <Row>
                    <PropertiesList {...this.props} />
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    properties: state.properties
})

const styles = {
    title: {
        fontSize: 36,
        lineHeight: 2,
        color: 'green',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        marginBottom: 20,
    }
}
export default connect(mapStateToProps)(Property)

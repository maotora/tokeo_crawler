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
        this.state = {
            properties: props.properties,
            searchText: ''
        }
    }

    addProperty() {
        this.props.history.push('/add_property')
    }

    handleSearch(e) {
        const { value } = e.target
        const { properties } = this.props
        const searchVal = value.trim().toLowerCase()
        this.setState({searchText: value})

        if(value.length > 0) {
            const searchedProperties = properties.filter(property => {
                if(property.status.toLowerCase().includes(searchVal)) {
                    return property
                } else if(property.description.toLowerCase().includes(searchVal)) {
                    return property
                } else if(property.location.toLowerCase().includes(searchVal)) {
                    return property
                }
            })

            this.setState({
                properties: searchedProperties
            })
        } else {
            this.setState({properties})
        }
    }

    render() {
        return (
            <Container>
                <Header pageName="Properties" {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <input
                                ref={(input) => input && input.focus()}
                                className="form-control"
                                onChange={::this.handleSearch}
                                value={this.state.searchText}
                                placeholder="Search Properties" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button onClick={::this.addProperty} push={true} color="green">Add Property</Button>
                    </Col>
                </Row>
                <Row>
                    <View marginTop="10" horizontalAlignment="center">
                        <Text style={styles.title}> Our Properties List </Text>
                    </View>
                </Row>
                <Row>
                    <PropertiesList data={this.state.properties} {...this.props} />
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    properties: state.properties,
    users: state.users
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

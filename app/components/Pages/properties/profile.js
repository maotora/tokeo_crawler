import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, Text, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'
import PropertiesList from './list'
import Header from '../Dashboard/header'
import ProfileListing from './profileList'

class Profile extends Component {
    constructor(props) {
        super(props)
    }

    goBack() {
        this.props.history.push('/admin')
    }

    goToEdit() {
        const { property, dispatch, history } = this.props
        dispatch({type: 'PROPETY_EDITS', payload: property.id})
        history.push('/edit_property')
    }

    render() {
        return (
            <Container>
                <Row style={{marginTop: 10}}>
                    <Col md={2}>
                        <button style={{border: 0}} className="btn btn-default btn-lg" onClick={::this.goBack}>
                            {icons.FaArrowLeft()}
                        </button>
                    </Col>
                    <Col md={10}>
                        <Header pageName="Property Profile" {...this.props} />
                    </Col>
                </Row>

                <Row>
                    <ProfileListing {...this.props} />
                </Row>

                <Row>
                    <View horizontalAlignment="center" margin="40">
                        <Button color="green" push onClick={() => this.goToEdit()}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', padding: 15, color: 'white'}}> Edit This Property </Text>
                        </Button>
                    </View>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const {id} = state.propertyTempEdits
    const property = state.properties.filter(property => property.id === id)[0]
    const customers = state.customers.filter(customer => customer.property === id)
    const owner = state.users.filter(user => user.id === property.owner)[0]

    return {
        auth: state.auth,
        customers,
        property,
        owner,
    }
}

export default connect(mapStateToProps)(Profile)

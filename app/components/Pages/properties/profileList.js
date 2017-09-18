import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, Text, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'

const ProfileListing = props => {
    const { owner, customer, property } = props

    return (
        <Row>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Name</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {property.name} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Location</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {property.location} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Description</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {property.description} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Status</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {property.status} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Owner</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {owner.names} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Property Customer</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {customer.names} </Text>
                </Col>
            </Col>
        </Row>
    )
}

const styles = {
    form_text: {
        textAlign: 'center',
        lineHeight: 3,
        fontSize: 17,
    },
    status: {
        textAlign: 'center',
        padding: 5,
        lineHeight: 3,
        fontWeight: 320,
        fontSize: 17
    },
    value: {
        fontWeight: 300,
    }
}

export default ProfileListing

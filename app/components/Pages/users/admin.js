import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import Header from '../Dashboard/header'

const Admin = props => {
    return (
        <Container>
            <Header {...props} />
            <Row>
                <Col md={8}>
                    <Col md={4}></Col>
                    <Col md={8}>
                        <TextInput placeholder="Search Customers" />
                    </Col>
                </Col>
                <Col md={4}>
                    <Button push={true} color="green"> Add Admin </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin


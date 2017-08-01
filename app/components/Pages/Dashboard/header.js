import React, { Component } from 'react';
import { Text } from 'react-desktop/windows'
import { Row, Col } from 'react-grid-system'

const Header = props => {
    return (
        <Row style={{marginBottom: 20}}>
            <Col md={8}>
                <Text 
                    horizontalAlignment="center"
                    style={{fontSize: 20}}
                > Customer Page </Text>
            </Col>
            <Col md={4}>
                <Text>Logged in as {props.user.username}</Text>
            </Col>
        </Row>
    )
}

export default Header

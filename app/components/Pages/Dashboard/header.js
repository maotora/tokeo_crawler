import React, { Component } from 'react';
import { Text, Button } from 'react-desktop/windows'
import { Row, Col } from 'react-grid-system'

const Header = props => {
    const { logout } = props

    return (
        <Col>
            <Row style={{marginBottom: 10}}>
                <Col md={8}>
                    <Text 
                        horizontalAlignment="center"
                        style={{fontSize: 20}}
                    > {props.pageName} Page </Text>
                </Col>
                <Col md={4}>
                    <Text>Logged in as {props.auth.username}</Text>
                </Col>
            </Row>
            {logout &&
                <Row style={{marginBottom: 20}}>
                    <Col md={8.2}></Col>
                    <Col md={3}>
                        <Button onClick={() => logout()}><Text>Logout</Text></Button>
                    </Col>
                </Row>
            }
        </Col>
    )
}

export default Header

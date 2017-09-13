import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Text } from 'react-desktop/windows'

const Statements = props => {
    const { 
        npm_package_author_name,
        npm_package_author_email,
        npm_package_name,
        npm_package_version
    } = process.env

    return (
        <Col>
            <Text> All rights reserved 
                <p style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 18}}> {npm_package_name}</p>
            </Text>
            <hr />
        </Col>
    )
}

export default Statements

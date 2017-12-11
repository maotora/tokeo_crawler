import React, { Component } from 'react'
import { remote } from 'electron'
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
                <p style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 18}}> {npm_package_name}&copy;</p>
            </Text>
            <View horizontalAlignment="center">
                <Text>
                    <p style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 18}}>
                        Version: {remote.app.getVersion()}
                    </p>
                </Text>
            </View>
            <hr />
        </Col>
    )
}

export default Statements

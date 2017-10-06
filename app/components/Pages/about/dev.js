import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Text } from 'react-desktop/windows'

const Developer = props => {
    const [ 
        npm_package_author_name,
        npm_package_author_email,
        npm_package_name,
        npm_package_version
    ] = ['Maotora Makweba', 'maotoramakweba@live.com', 'Mijengo', 'Version 1.0.1']

    return (
        <Row>
            <Row>
                <p style={styles.author_header}>
                    Project Author Details
                </p>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Author:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        HackEAC
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Author Email:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        mijengo@hackeac.com
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Author Phone:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        +255-626-7632-74
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Website:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        https://mijengo.hackeac.com
                    </p>
                </Col>
            </Row>
        </Row>
    )
}

export default Developer

const styles = {
    author_header: {
        fontSize: 22,
        fontWeight: 320,
        lineHeight: 2,
        textAlign: 'center'
    },
    form_text: {
        textAlign: 'center',
        lineHeight: 3,
        fontSize: 17,
    },
    btn_text: {
        fontSize: 17,
    },
    property: {
        fontWeight: 320,
    },
    value: {
        fontWeight: 300,
    },
    form_title: {
        lineHeight: 4,
        fontSize: 32,
        fontWeight: 300,
        color: 'green',
    },
    form_index: {
        lineHeight: 1,
        fontWeight: 320,
        color: 'black',
    }
}

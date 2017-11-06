import React, { Component } from 'react'
import { Col, Row, Container } from 'react-grid-system'
import { View, Text } from 'react-desktop/windows'

const Owner = props => {
    const owner = props.users.filter(user => user.role === 'owner')[0]
    const { names, email, phone } = owner
    return (
        <Row>
            <Row style={styles.header}>
                <p>
                    Owner Details
                </p>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Owner Name:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        {names}
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Owner Email:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        {email}
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <p style={{...styles.form_text, ...styles.property}}>
                        Project Owner Phone:
                    </p>
                </Col>

                <Col md={4}>
                    <p style={{...styles.form_text, ...styles.value}}>
                        {phone}
                    </p>
                </Col>
            </Row>
        </Row>
    )
}

export const NoCustomerProfile = props => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <p style={{...styles.header}}>
                        No Owner Information Added.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Owner

const styles = {
    header: {
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

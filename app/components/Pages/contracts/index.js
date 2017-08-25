import React, { Component } from 'react';
import { View, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'

class Contracts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { firstName } = this.props
        return (
            <Container>
                <Row>
                    <Col>
                        <Text> Yo, it's contracts time {firstName}! </Text>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Contracts

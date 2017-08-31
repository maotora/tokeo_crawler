import React, { Component } from 'react'
import { View, Text } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import AddPropertyForm from '../../Forms/addPropertyForm'

class AddProperty extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'TO_ADD_PROPERTY', payload: values})
		this.props.history.push('/admin')
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}> Add Property Form </Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <AddPropertyForm {...this.props} onSubmit={::this.submit} />
                    </View>
                </Row>
            </Container>
        )
    }
}

const styles = {
    header: {
        fontSize: 24,
        lineHeight: 3,
        fontWeight: 320,
    }
}

export default connect()(AddProperty)

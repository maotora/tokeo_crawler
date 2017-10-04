import React, { Component } from 'react'
import { View, Text } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import EditPropertyForm from '../../Forms/editPropertyForm'

class EditProperty extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'TO_EDIT_PROPERTY', payload: {values}})
		this.props.history.goBack()
    }

    render() {
        return (
            <Container className="container-fluid">
                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <Text style={styles.header}> Edit Property Form </Text>
                    </View>
                </Row>

                <Row>
                    <View width="100%" horizontalAlignment="center">
                        <EditPropertyForm {...this.props} onSubmit={::this.submit} />
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

export default connect()(EditProperty)

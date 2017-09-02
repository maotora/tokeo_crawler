import React, { Component } from 'react'
import { View, Text } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import EditPropertyForm from '../../Forms/editPropertyForm'

class EditProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    submit(values) {
		this.props.dispatch({type: 'TO_EDIT_PROPERTY', payload: {values, index: this.state.index}})
		this.props.history.push('/admin')
    }

    getIndex(index) {
        if(index !== this.state.index) {
            this.setState({index})
        }
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
                        <EditPropertyForm getIndex={::this.getIndex} {...this.props} onSubmit={::this.submit} />
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

import React, { Component } from 'react'
import { View, Text } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import AddPropertyForm from '../../Forms/addPropertyForm'
import toastr from 'toastr'

class AddProperty extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'TO_ADD_PROPERTY', payload: values})
		this.props.history.push('/admin')
    }

    componentWillMount() {
        const owners = this.props.users.filter(({role}) => role === 'owner')

        if(owners.length === 0) {
            toastr.error('To add properties you Need to have User with OWNER role first!')
            this.props.dispatch({type: 'DASHBOARD_SELECTION', payload: {selection: 'Admin'}})
            this.props.history.push('/admin')
        }
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

const mapStateToProps = state => ({
    users: state.users
})
export default connect(mapStateToProps)(AddProperty)

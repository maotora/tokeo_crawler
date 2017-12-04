import React, { Component } from 'react'
import { View, Text } from 'react-desktop/windows'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import EditPropertyForm from '../../Forms/Properties/editPropertyForm'
import toastr from 'toastr'

class EditProperty extends Component {
    constructor(props) {
        super(props)
    }

    submit(values) {
		this.props.dispatch({type: 'TO_EDIT_PROPERTY', payload: {values}})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.properties !== this.props.properties) {
            this.props.history.goBack()
        } 
    }

    componentWillMount() {
        const {users} = this.props
        const authId = this.props.auth.id
        const isModerator = users.find(user => user.role === 'moderator' && user.id === authId)

        if(isModerator) {
            toastr.error('Moderator cannot edit anything!', 'Roles restrictions')
            this.props.history.goBack()
            return false
        } else {
            return true
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

const mapStateToProps = state => ({
    properties: state.properties,
    users: state.users.filter(user => user && !user.deleted),
    auth: state.auth,
})

export default connect(mapStateToProps)(EditProperty)

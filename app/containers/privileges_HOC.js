import React, { Component } from 'react'
import { userLog } from '../sagas/lib'
import { connect } from 'react-redux'

export default function privileges_HOC(ComposedComponent) {
    class Privileges extends Component {

        renderComposedComponent() {
            const {id} = this.props.auth
            const user = this.props.users.find(obj => obj.id === id)

            if(user.role === 'moderator') {
                this.props.history.goBack()
                userLog('Sorry, Moderators cannot access this resource.', 'Access Denied', 'info')
            } else {
                return <ComposedComponent {...this.props} />
            }
        }

        render() {
            return (
                <div>
                    {this.renderComposedComponent()}
                </div>
            )
        }
    }

    const mapStateToProps = state => ({
        auth: state.auth,
        users: state.users,
    })

    return connect(mapStateToProps)(Privileges)
}

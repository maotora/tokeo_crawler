import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import AdminsList from './list'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: props.users,
            searchText: ''
        }
    }

    addAdmin() {
        this.props.history.push('/add_admin')
    }

    handleSearch(e) {
        const { value } = e.target
        const { users } = this.props
        const searchVal = value.trim().toLowerCase()
        this.setState({searchText: value})

        if(value.length > 0) {
            const searchedUsers = users.filter(user => {
                return user && user.names.toLowerCase().includes(searchVal)
            })

            this.setState({
                users: searchedUsers
            })
        } else {
            this.setState({users})
        }
    }

    render() {
        return (
            <Container>
                <Header pageName="Admin" {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <input
                                ref={(input) => input && input.focus()}
                                className="form-control"
                                value={this.state.searchText}
                                onChange={::this.handleSearch}
                                placeholder="Search Admins" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button onClick={::this.addAdmin} push={true} color="green"> Add Admin </Button>
                    </Col>
                </Row>
                <Row>
                    <AdminsList {...this.props} data={this.state.users} />
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
	auth: state.auth,
	users: state.users,
})

export default connect(mapStateToProps)(Admin)

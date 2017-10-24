import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import * as icons from 'react-icons/lib/fa'
import { connect } from 'react-redux'
const imgSource = './assets/img/empty.png'

class List extends Component {
    constructor(props) {
        super(props)
    }
	
	removeAdmin(id) {
		const { history, dispatch } = this.props
		dispatch({type: 'REMOVE_USER', payload: {id}})
	}

    toEdit(id) {
		const { dispatch, history } = this.props
		dispatch({type: 'USER_EDITS', payload: {id}})
		history.push('edit_admin')
    }

    deletionStatus(id) {
        const hasProperty = this.props.properties.find(property => property.owner === id)
        const isLoggedIn = this.props.auth.id === id

        if(hasProperty || isLoggedIn) {
            return true
        }
        return false
    }

    adminLists(data) {
        if(data.length >= 1) {
            return data.map((admin, index) => {
                const { firstName, lastName, role, email, phone, id} = admin
                return (
                    <li key={index} style={{listStyle: 'none'}}>
                        <Col>
                            <Text style={{...styles.form_title, ...styles.form_index}}> {index + 1} </Text>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Admin Names: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {`${lastName}, ${firstName}`} </Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Email Address: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {email} </Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Phone Number: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {phone} </Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Admin Role </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {role} </Text>
                            </Col>
                        </Col>
                        <Col> <Text horizontalAlignment="center" style={styles.form_title}> Admin Actions </Text> </Col>
                        <Col style={{marginTop: 10}}>
                            <div className="btn-group btn-group-justified" aria-label="Justified" role="group">
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default'
                                        onClick={() => this.toEdit(id)}
                                    >
                                        <p style={styles.btn_text}> Edit User </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-danger' onClick={() => this.removeAdmin(id)}
                                        disabled={this.deletionStatus(id)}>
                                        <p style={styles.btn_text}> Remove User </p>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col> <hr /> </Col>
                    </li>
                )
            })
        } else {
            return (
                <View horizontalAlignment="center">
                    <Col md={12}>
                        <img src={imgSource} />
                    </Col>
                </View>
            )
        }
    }

    render() {
        return (
            <Col>
                <ul>
                    {this.adminLists(this.props.data)}
                </ul>
            </Col>
        )
    }
}

const styles = {
    form_text: {
        textAlign: 'center',
        lineHeight: 3,
        fontSize: 17,
    },
    property: {
        fontWeight: 320,
    },
    btn_text: {
        fontSize: 17,
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

const filterFuction = obj => obj && !obj.deleted

const mapStateToProps = state => ({
    properties: state.properties.filter(filterFuction),
    users: state.users.filter(filterFuction),
})

export default connect(mapStateToProps)(List)

import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import * as icons from 'react-icons/lib/fa'

class List extends Component {
    constructor(props) {
        super(props)
    }
	
	removeAdmin(index) {
		const { history, dispatch } = this.props
		dispatch({type: 'REMOVE_USER', payload: {index}})
		history.push('/admin')
	}

    adminLists(data) {
        if(data.length >= 1) {
            return data.map((admin, index) => {
                const { names, role, email, phone } = admin
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
                                <Text style={{...styles.form_text, ...styles.value}}> {names} </Text>
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
                            <Col md={1}>
                                <button className="btn btn-primary">
                                    {icons.FaPencil()}
                                </button>
                                <Text style={styles.form_text}> Edit </Text>
                            </Col>
                            <Col md={10}></Col> {/* Spacer */}
                            <Col md={1}>
                                <button className="btn btn-danger" onClick={() => this.removeAdmin(index)}>
                                    {icons.FaClose()}
                                </button>
                                <Text style={styles.form_text}> Remove </Text>
                            </Col>
                        </Col>
                        <Col> <hr /> </Col>
                    </li>
                )
            })
        } else {
            return (
                <Row>
                    <Text> No admins for now </Text>
                    <Text> Care to add one? </Text>
                </Row>
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
export default List

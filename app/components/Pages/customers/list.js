import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as icons from 'react-icons/lib/fa'

class CustomerList extends Component {
    constructor(props) {
        super(props)
    }

    toEditCustomer(id) {
        const { history, dispatch } = this.props
        dispatch({type: 'CUSTOMER_EDITS', payload: {id}})
        history.push('/edit_customer')
    }

	removeCustomer(id, propertyIndex) {
        const { history, data, dispatch } = this.props
		dispatch({type: 'TO_REMOVE_CUSTOMER', payload: {id, propertyIndex}})
	}

    payments(id) {
        const { history, dispatch } = this.props
        dispatch({type: 'CUSTOMER_EDITS', payload: {id}})
        history.push('/payments')
    }

    list(data) {

        data = data.filter(customer => customer.status !== 'Contract Terminated')

        if(data.length >= 1) {
            return data.map((item, index) => {
                let { id, status, names, email, phone, property } = item
                return (
                    <li key={index} style={{listStyle: 'none'}}>
                        <Col>
                            <Text style={{...styles.form_title, ...styles.form_index}}> {index + 1} </Text>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Customer Names: </Text>
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
                                <Text style={{...styles.form_text, ...styles.property}}> Payments Status: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {status} </Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Owned: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {this.props.properties[property]['name']} </Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Location: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {this.props.properties[property]['location']} </Text>
                            </Col>
                        </Col>
                        <Col> <Text horizontalAlignment="center" style={styles.form_title}> Customer Actions </Text> </Col>
                        <Col style={{marginTop: 10}}>
                            <div className="btn-group btn-group-justified" aria-label="Justified" role="group">
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default'
                                        onClick={() => this.toEditCustomer(id)}
                                    >
                                        <p style={styles.btn_text}> Edit Customer </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default' onClick={() => this.payments(id)}>
                                        <p style={styles.btn_text}> View Customer Payments </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default' onClick={() => this.removeCustomer(id, property)}>
                                        <p style={styles.btn_text}> Delete Customer </p>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col> <hr /> </Col>
                    </li>
                )
            })
        } else {
            return <Text> No customer yet! </Text>
        }
    }

    render() {
        const { history, data, dispatch } = this.props

        return (
            <Col>
                <ul>
                    {this.list(data)}
                </ul>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    properties: state.properties
})

export default connect(mapStateToProps)(CustomerList)

const styles = {
    form_text: {
        textAlign: 'center',
        lineHeight: 3,
        fontSize: 17,
    },
    btn_text: {
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

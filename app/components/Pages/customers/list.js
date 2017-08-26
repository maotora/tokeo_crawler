import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import * as icons from 'react-icons/lib/fa'

class CustomerList extends Component {
    constructor(props) {
        super(props)
    }

    toEditCustomer(index) {
        console.log('Clicked lol ', index)
        const { history, dispatch } = this.props
        dispatch({type: 'CUSTOMER_EDITS', payload: {id: index}})
        history.push('/edit_customer')
    }

	removeCustomer(index) {
        const { history, data, dispatch } = this.props
		dispatch({type: 'REMOVE_CUSTOMER', payload: {index}})
		history.push('/admin')
	}

    payments(index) {
        const { history, dispatch } = this.props
        dispatch({type: 'CUSTOMER_EDITS', payload: {id: index}})
        history.push('/payments')
    }

    list(data) {
        if(data.length >= 1) {
            return data.map((item, index) => {
                let { firstName, lastName, email, phone, product } = item
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
                                <Text style={{...styles.form_text, ...styles.property}}> Product Owned: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}> {product} </Text>
                            </Col>
                        </Col>
                        <Col> <Text horizontalAlignment="center" style={styles.form_title}> Customer Actions </Text> </Col>
                        <Col style={{marginTop: 10}}>
                            <div className="btn-group btn-group-justified" aria-label="Justified" role="group">
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default'
                                        onClick={() => this.toEditCustomer(index)}
                                    >
                                        <p style={styles.btn_text}> Edit Customer </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default' onClick={() => this.payments(index)}>
                                        <p style={styles.btn_text}> View Customer Payments </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default' onClick={() => this.removeCustomer(index)}>
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
export default CustomerList

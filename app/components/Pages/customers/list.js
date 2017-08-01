import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import * as icons from 'react-icons/lib/fa'

const CustomerList = props => {
    const { data } = props

    function list(data) {
        if(data.length >= 1) {
            return data.map((item, index) => {
                let { name, email, phone, product } = item
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
                                <Text style={{...styles.form_text, ...styles.value}}> {name} </Text>
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
                            <Col md={3}>
                                <Button push={true}>
                                    {icons.FaPencil()}
                                </Button>
                                <Text style={styles.form_text}> Edit </Text>
                            </Col>
                            <Col md={3}>
                                <Button push={true}>
                                    {icons.FaPlus()}
                                </Button>
                                <Text style={styles.form_text}> Add Product </Text>
                            </Col>
                            <Col md={3}>
                                <Button push={true}>
                                    {icons.FaFilePdfO()}
                                </Button>
                                <Text style={styles.form_text}> Contracts </Text>
                            </Col>
                            <Col md={3}>
                                <Button push={true}>
                                    {icons.FaClose()}
                                </Button>
                                <Text style={styles.form_text}> Delete </Text>
                            </Col>
                        </Col>
                        <Col> <hr /> </Col>
                    </li>
                )
            })
        } else {
            return <Text> No customer yet! </Text>
        }
    }

    return (
        <Col>
            <ul>
                {list(data)}
            </ul>
        </Col>
    )
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
export default CustomerList

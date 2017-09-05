import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import * as icons from 'react-icons/lib/fa'

class PropertiesList extends Component {
    constructor(props) {
        super(props)
    }

    toEditProperty(id) {
        this.props.dispatch({type: 'PROPERTY_EDITS', payload: {id}})
        this.props.history.push('/edit_property')
    }

    toRemoveProperty(index) {
        this.props.dispatch({type: 'REMOVE_PROPERTY', payload: {index}})
        this.props.history.push('/admin')
    }

    list(data) {
        if(data.length >= 1 && data[0].name !== null) {
            return data.map((property, index) => {
                let {name, owner, price, location, description, status} = property
                return (
                    <li key={index} style={{listStyle: 'none'}}>
                        <Col>
                            <Text style={{...styles.form_title, ...styles.form_index}}> {index + 1} </Text>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Name: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{name}</Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Location: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{location}</Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Description: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{description}</Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Owner: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{owner}</Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Status: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{status}</Text>
                            </Col>
                        </Col>
                        <Col>
                            <Col md={4}>
                                <Text style={{...styles.form_text, ...styles.property}}> Property Price: </Text>
                            </Col>
                            <Col md={8}>
                                <Text style={{...styles.form_text, ...styles.value}}>{price}</Text>
                            </Col>
                        </Col>

                        <Col> <Text horizontalAlignment="center" style={styles.form_title}> Property Actions </Text> </Col>
                        <Col style={{marginTop: 10}}>
                            <div className="btn-group btn-group-justified" aria-label="Justified" role="group">
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default'
                                        onClick={() => this.toEditProperty(index)}
                                    >
                                        <p style={styles.btn_text}> Edit Property </p>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className='btn btn-default'
                                        onClick={() => this.toRemoveProperty(index)}
                                        disabled={status && status !== 'Vacant'}
                                    >
                                        <p style={styles.btn_text}> Delete Property </p>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col> <hr /> </Col>
                    </li>
                )
            })
        } else {
            return <Text> No Properties yet! </Text>
        }
    }

    render() {
        return (
            <Col md={12}>
                <ul>
                    {this.list(this.props.properties)}
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
export default PropertiesList

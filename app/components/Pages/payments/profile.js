import React from 'react';
import { Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'

const Profile = props => {

    const { names, email, phone, cardId, property, status } = props.customer
    const { properties } = props
    const propertyObj = properties.filter(propertyVal => propertyVal.id === property)[0]


    return (
        <Row>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Customer Names: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {names} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Card ID</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {cardId} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Email Address: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {email} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Phone Number: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {phone} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Property Owned: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {propertyObj['name']} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Property Location: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {propertyObj['location']} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Payment Status: </Text>
                </Col>
                <Col md={8}>
                    {status === 'Payments Settled' ?
                        (
                            <p className="label label-default" style={styles.status}> {status} </p> 
                        ) : (
                            <p className="label label-danger" style={styles.status}> {status} </p>
                        )
                    }
                </Col>
            </Col>
        </Row>
    )

}

const styles = {
    form_text: {
        textAlign: 'center',
        lineHeight: 3,
        fontSize: 17,
    },
    status: {
        textAlign: 'center',
        padding: 5,
        lineHeight: 3,
        fontWeight: 320,
        fontSize: 17
    },
    value: {
        fontWeight: 300,
    }
}

export default Profile

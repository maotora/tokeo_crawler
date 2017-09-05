import React from 'react';
import { Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'

const Profile = props => {

    const { firstName, lastName, email, phone, id, property, status } = props.customer
    const { properties } = props


    return (
        <Row>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Customer Names: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {`${lastName}, ${firstName}`} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}>Identification Number:</Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {id} </Text>
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
                    <Text style={{...styles.form_text, ...styles.value}}> {properties[property]['name']} </Text>
                </Col>
            </Col>
            <Col>
                <Col md={4}>
                    <Text style={{...styles.form_text}}> Property Location: </Text>
                </Col>
                <Col md={8}>
                    <Text style={{...styles.form_text, ...styles.value}}> {properties[property]['location']} </Text>
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

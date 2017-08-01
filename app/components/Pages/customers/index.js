import React, { Component } from 'react';
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Header from '../Dashboard/header'
import CustomersList from './list'

const customers = [
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    },
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    },
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    }
]

class Customer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: customers
        }
    }

    render() {
        return (
            <Container>
                <Header {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <TextInput width="90%" placeholder="Search Customers" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button push={true} color="green">Add Customer</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.title}> Our Customers List </Text>
                    </Col>
                </Row>
                <Row>
                    <View horizontalAlignment="left">
                        <CustomersList data={this.state.list} />
                    </View>
                </Row>
            </Container>
        )
    }
}

const styles = {
    title: {
        fontSize: 36,
        lineHeight: 2,
        color: 'green',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        marginBottom: 20,
    }
}
export default Customer

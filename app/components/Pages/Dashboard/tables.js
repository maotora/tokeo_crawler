import React, { Component } from 'react';
import { View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import * as icons from 'react-icons/lib/fa'
import Header from './header'

const products = [
    {
        id: 1,
        name: "product 1",
        price: 20
    },

    {
        id: 2,
        name: "product 2",
        price: 40
    },
    {
        id: 3,
        name: "product 3",
        price: 80
    }
]

const Table = props => {
    return (
        <Container>
            <Header {...props} />
            <Row>
                <Col md={11}>
                    <BootstrapTable data={products} hover striped>
                        <TableHeaderColumn isKey dataField="id">Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="price">Price</TableHeaderColumn>
                    </BootstrapTable>
                </Col>
            </Row>
        </Container>
    )
}

export default Table

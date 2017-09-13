import React, { Component } from 'react';
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'

class Table extends Component {
    constructor(props) {
        super(props)
    }

    tableColors(value, row, rowId, colId) {
        switch(value) {
            case 'Contract Expired': {
                return 'expired'
            }

            case 'Payments Settled': {
                return 'paid'
            }

            case '1 month remain': {
                return 'fewer_days'
            }

            case '2 months remain': {
                return 'fewer_days'
            }

            case '3 months remain': {
                return 'few_days'
            }

            case '4 months remain': {
                return 'few_days'
            }
        }
    }

    propertyNameFormat(cell, row) {
        const propertyObj = this.props.properties.filter(property => property.id === cell)[0]
        return `${propertyObj['name']}`
    }

    propertyLocationFormat(cell, row) {
        const propertyObj = this.props.properties.filter(property => property.id === cell)[0]
        return `${propertyObj['location']}`
    }

    propertyOwnerFormat(cell, row) {
        const user = this.props.users.filter(user => user.id === cell)[0]
        return `${user['names']}`
    }

    expiryDateFormat(cell, row) {
        return `${moment(cell).format('Do MMMM YYYY')}`
    }

    priceFormat(cell, row) {
        return `${cell}/=`
    }

    phoneFormat(cell) {
        return `+${cell}`
    }

    createdFormat(cell, row) {
        return `${moment(cell.createdAt).format('DD MMMM YYYY')}`
    }

    onPropertyRowClick(row) {
        console.log(row)
    }

    onCustomerRowClick(row) {
        const { id } = row
        this.props.dispatch({type: 'CUSTOMER_EDITS', payload: {id}})
        this.props.history.push('/payments')
    }

    //- TODO: this gives error, fix it to allow multiple customers deletion!
    handleDelete(onClick) {
        console.log('Delete stuff!')
        onClick()
    }

    createCustomBtn(onClick) {
        return (
            <DeleteButton
                className="btn btn-danger"
                btnText="Delete"
                btnContextual="btn-danger"
                onClick={() => this.handleDelete(onClick)}
            />
        )
    }

	render() {
        const { properties, history, customers } = this.props

        const options = {
            customer: {
                onRowClick: ::this.onCustomerRowClick,
                deleteBtn: ::this.createCustomBtn
            },
            property: {
                onRowClick: this.onPropertyRowClick,
            }
        }

        return (
            <Container>
                <Header pageName="Tables" {...this.props} />

                <Row>
                    <Col md={8}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}> Customers Table </Text>
                    </Col>

                    <Col md={4}>
                        <Button onClick={() => history.push('/add_customer')} push={true} color="green">Add Customer</Button>
                    </Col>
                </Row>

                <Row style={{marginBottom: 100, marginTop: 10}}>
                    <Col md={11}>
                        <BootstrapTable options={options.customer} data={customers} hover striped pagination deleteRow>
                            <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={::this.phoneFormat} dataField="phone">Phone Number</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.propertyNameFormat} dataField="property">Property Name</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' columnClassName={ this.tableColors } dataField="status">Contract Status</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.createdFormat} dataSort={true} dataField="createdAt">Created At</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.expiryDateFormat} dataSort={true} dataField="endDate">End Date</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}> Properties Table </Text>
                    </Col>

                    <Col md={4}>
                        <Button onClick={() => history.push('/add_property')} push={true} color="green">Add Properties</Button>
                    </Col>
                </Row>

                <Row style={{marginBottom: 100, marginTop: 10}}>
                    <Col md={11}>
                        <BootstrapTable options={options.property} data={properties} hover striped pagination >
                            <TableHeaderColumn dataAlign='center' isKey={true} dataField="name">Name</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataField="propertyType">Type</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataField="location">Location</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataField="status">Status</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.priceFormat} dataField="price">Price</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.propertyOwnerFormat} dataField="owner">Owner</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customers,
    properties: state.properties,
    users: state.users,
})

export default connect(mapStateToProps)(Table)

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
        this.state = {
            order: 'desc'
        }
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
        return `${moment(cell).format('DD MMMM YYYY')}`
    }

    priceFormat(cell, row) {
        return `${cell}/=`
    }

    phoneFormat(cell) {
        return `+${cell}`
    }

    createdFormat(cell, row) {
        return `${moment(Number(cell)).format('DD MMMM YYYY')}`
    }

    onPropertyRowClick({id}) {
        this.props.dispatch({type: 'PROPERTY_EDITS', payload: {id}})
        this.props.history.push('/property_profile')
    }

    onCustomerRowClick(row) {
        const { id } = row
        this.props.dispatch({type: 'CUSTOMER_EDITS', payload: {id}})
        this.props.history.push('/payments')
    }

    sortCustomerPaymets() {
        if(this.state.order === 'desc') {
            this.refs.customerTable.handleSort('asc', 'endDate')
            this.setState({order: 'asc'})
        } else {
            this.refs.customerTable.handleSort('desc', 'endDate')
            this.setState({order: 'desc'})
        }
    }

    renderShowsTotal(start, to, total) {
        return <p>From customer { start } to { to }, total is { total } customers.</p>
    }

	render() {
        const { properties, history, customers } = this.props

        const options = {
            customer: {
                onRowClick: ::this.onCustomerRowClick,
                sizePerPageList: [ {
                    text: '5', value: 5
                }, {
                    text: '10', value: 10
                }, {
                    text: 'All', value: customers.length
                } ],
                sizePerPage: 5,
                paginationSize: 3,
                prePage: 'Prev',
                nextPage: 'Next',
                firstPage: 'First',
                lastPage: 'Last',
                paginationShowsTotal: this.renderShowsTotal,
            },
            property: {
                onRowClick: ::this.onPropertyRowClick,
            }
        }

        return (
            <Container>
                <Header pageName="Tables" {...this.props} />

                <Row>
                    <Col md={4}>
                        <Button onClick={() => this.sortCustomerPaymets()} push={true} color="#318484">Sort Customer</Button>
                    </Col>
                    <Col md={4}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}> Customers Table </Text>
                    </Col>

                    <Col md={4}>
                        <Button onClick={() => history.push('/add_customer')} push={true} color="green">Add Customer</Button>
                    </Col>
                </Row>

                <Row style={{marginBottom: 100, marginTop: 10}}>
                    <Col md={11}>
                        <BootstrapTable ref='customerTable' options={options.customer} data={customers} hover striped pagination={true} >
                            <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={::this.phoneFormat} dataField="phone">Phone Number</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.propertyNameFormat} dataField="property">Property Name</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' columnClassName={ this.tableColors } dataField="status">Contract Status</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.createdFormat} dataField="createdAt">Created At</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.expiryDateFormat} dataField="endDate">End Date</TableHeaderColumn>
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

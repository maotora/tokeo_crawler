import React, { Component } from 'react';
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
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
            case '5 < Days remain': {
                return 'fewer_days'
            }
            case '10 < Days remain': {
                return 'few_days'
            }
            case '30 < Days remain': {
                return 'few_days'
            }
        }

        console.log('value is ', value)
    }

	render() {
        const { history, customers } = this.props

        return (
            <Container>
                <Header pageName="Tables" {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <TextInput width="90%" placeholder="Search Customers" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button onClick={() => history.push('/add_customer')} push={true} color="green">Add Customer</Button>
                    </Col>
                </Row>
                <Row style={{paddingBottom: 100}}>
                    <Col md={11}>
                        <BootstrapTable data={customers} hover striped pagination >
                            <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                            <TableHeaderColumn dataField="phone">Phone Number</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataField="product">Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' columnClassName={ this.tableColors } dataField="status">Contract Status</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataSort={true} dataField="endDate">End Date</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
	customers: state.customers
})

export default connect(mapStateToProps)(Table)


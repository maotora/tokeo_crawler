import React, { Component } from 'react';
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class CustomerList extends Component {
    constructor(props) {
        super()
    }

    createdFormat(cell, row) {
        return `${moment(cell.createdAt).format('DD MMMM YYYY')}`
    }

    expiryDateFormat(cell, row) {
        return `${moment(cell).format('Do MMMM YYYY')}`
    }

    phoneFormat(cell) {
        return `+${cell}`
    }

    render() {
        const { customer } = this.props
        return (
            <Row style={{marginBottom: 100, marginTop: 10}}>
                <Col md={11}>
                    <BootstrapTable ref='customerTable' data={customer} hover striped pagination={true} >
                        <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={::this.phoneFormat} dataField="phone">Phone Number</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField="status">Contract Status</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataFormat={::this.createdFormat} dataField="createdAt">Created At</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataFormat={::this.expiryDateFormat} dataField="endDate">End Date</TableHeaderColumn>
                    </BootstrapTable>
                </Col>
            </Row>
        )
    }
}

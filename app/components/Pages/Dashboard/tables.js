import React, { Component } from 'react';
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'
import Header from './header'

const Table = props => {
	const { history, customers } = props

    return (
        <Container>
            <Header pageName="Tables" {...props} />
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
            <Row>
                <Col md={11}>
                    <BootstrapTable data={customers} hover striped>
                        <TableHeaderColumn isKey={true} dataField="names">Customer Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                        <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
                        <TableHeaderColumn dataField="product">Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="startDate">Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="endDate">End Date</TableHeaderColumn>
                    </BootstrapTable>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
	customers: state.customers
})

export default connect(mapStateToProps)(Table)

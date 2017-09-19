import React, { Component } from 'react';
import { View, TextInput, Button, NavPaneItem, Text, NavPane } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'

class ProfileListing extends Component {
    constructor(props) {
        super(props)
    }

    priceFormat(cell, row) {
        return `${cell}/=`
    }

    phoneFormat(cell) {
        return `+${cell}`
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

    dateExpiryFormat(cell, row) {
        return `${moment(cell).format('DD MMMM YYYY')}`
    }

    dateCreatedFormat(cell, row) {
        return `${moment(cell).format('DD MMMM YYYY')}`
    }

    render() {
        const { owner, customers, property } = this.props

        return (
            <Row style={{marginTop: 10}}>
                <Col>
                    <Col md={4}>
                        <Text style={{...styles.form_text}}>Property Name</Text>
                    </Col>
                    <Col md={8}>
                        <Text style={{...styles.form_text, ...styles.value}}> {property.name} </Text>
                    </Col>
                </Col>

                <Col>
                    <Col md={4}>
                        <Text style={{...styles.form_text}}>Property Location</Text>
                    </Col>
                    <Col md={8}>
                        <Text style={{...styles.form_text, ...styles.value}}> {property.location} </Text>
                    </Col>
                </Col>

                <Col>
                    <Col md={4}>
                        <Text style={{...styles.form_text}}>Property Description</Text>
                    </Col>
                    <Col md={8}>
                        <Text style={{...styles.form_text, ...styles.value}}> {property.description} </Text>
                    </Col>
                </Col>

                <Col>
                    <Col md={4}>
                        <Text style={{...styles.form_text}}>Property Status</Text>
                    </Col>
                    <Col md={8}>
                        <Text style={{...styles.form_text, ...styles.value}}> {property.status} </Text>
                    </Col>
                </Col>

                <Col>
                    <Col md={4}>
                        <Text style={{...styles.form_text}}>Property Owner</Text>
                    </Col>
                    <Col md={8}>
                        <Text style={{...styles.form_text, ...styles.value}}> {owner.names} </Text>
                    </Col>
                </Col>

                {customers.length > 0 &&
                    <Row>
                        <Col> <Text horizontalAlignment="center" style={styles.form_title}> Our Customers </Text> </Col>

                        <Col>
                            <BootstrapTable data={customers}>
                                <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                                <TableHeaderColumn dataFormat={::this.phoneFormat} dataField="phone">Phone Number</TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' columnClassName={::this.tableColors} dataField="status">Contract Status</TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataFormat={::this.dateCreatedFormat} dataField="startDate">Start Date</TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataFormat={::this.dateExpiryFormat} dataField="endDate">End Date</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                }
            </Row>
        )
    }
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
    },
    form_title: {
        lineHeight: 4,
        fontSize: 32,
        fontWeight: 300,
        color: 'green',
    },
}

export default ProfileListing

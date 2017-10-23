import React, { Component } from 'react';
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'
import CustomersList from './list'
import _ from 'lodash'

class Customer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: props.customers,
            searchText: ''
        }
    }

	addCustomer() {
		this.props.history.push('/add_customer')
	}

    handleSearch(e) {
        const { value } = e.target
        const { customers } = this.props
        const searchVal = value.trim().toLowerCase()
        this.setState({searchText: value})

        if(value.length > 0) {
            const searchedCustomer = customers.filter(customer => {
                if(customer.names.toLowerCase().includes(searchVal)) {
                    return customer
                } else if(customer.status.toLowerCase().includes(searchVal)) {
                    return customer
                }
            })

            this.setState({
                customers: searchedCustomer
            })
        } else {
            this.setState({customers})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props.customers, nextProps.customers)) {
            this.setState({
                customers: nextProps.customers
            })
        }
    }

    render() {
        return (
            <Container>
                <Header pageName="Customers" {...this.props} />
                <Row>
                    <Col md={8}>
                        <Col md={4}></Col>
                        <Col md={8}>
                            <input 
                                className="form-control" 
                                ref={(input) => input && input.focus()}
                                onChange={::this.handleSearch}
                                value={this.state.searchText}
                                placeholder="Search Customers Names" />
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Button onClick={::this.addCustomer} push={true} color="green">Add Customer</Button>
                    </Col>
                </Row>
                <Row>
                    <View horizontalAlignment="center" margin="10">
                        <Text style={styles.title}> Our Customers List </Text>
                    </View>
                </Row>
                <Row>
                    <CustomersList {...this.props} data={this.state.customers} />
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

const mapStateToProps = state => ({
    customers: state.customers.filter(customer => customer && !customer.deleted)
})

export default connect(mapStateToProps)(Customer)

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { TextInput, View, Button, NavPaneItem, NavPane, Text } from 'react-desktop/windows'
import { Row, Container, Col } from 'react-grid-system'
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table'
import moment from 'moment'
import smalltalk from 'smalltalk'
import _ from 'lodash'
import { connect } from 'react-redux'
import Header from '../Dashboard/header'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: 'desc',
            selected: [],
            customers: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(nextProps.customers, this.props.customers)) {
            this.setState({customers: nextProps.customers})
        }
    }

    componentDidMount() {
        if(!_.isEqual(this.state.customers, this.props.customers)) {
            this.setState({customers: this.props.customers.filter(filterFuction)})
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

    dateFormat(cell, row) {
        return `${moment(cell).format('Do MMMM \'YY')}`
    }

    priceFormat(cell, row) {
        return `${cell}/=`
    }

    phoneFormat(cell) {
        return `+${cell}`
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

    customMultiSelect(props) {
        const { type, checked, disabled, onChange, rowIndex } = props;
        /*
        * If rowIndex is 'Header', means this rendering is for header selection column.
        */
        if (rowIndex === 'Header') {
            return (
            <div className='checkbox-personalized'>
                <Checkbox {...props}/>
                <label htmlFor={ 'checkbox' + rowIndex }>
                <div className='check'></div>
                </label>
            </div>);
        } else {
            return (
            <div className='checkbox-personalized'>
                <input
                type={ type }
                name={ 'checkbox' + rowIndex }
                id={ 'checkbox' + rowIndex }
                checked={ checked }
                disabled={ disabled }
                onChange={ e=> onChange(e, rowIndex) }
                ref={ input => {
                    if (input) {
                    input.indeterminate = props.indeterminate;
                    }
                } }/>
                <label htmlFor={ 'checkbox' + rowIndex }>
                <div className='check'></div>
                </label>
            </div>);
        }
    }

    removeCustomers() {
        this.state.selected.forEach(({id, property}) => this.props.dispatch({type: 'TO_REMOVE_CUSTOMER', payload: {id, propertyId: property}}))
    }

    handleDeleteButtonClick() {
        smalltalk.confirm('Confirm Delete', 'Are you sure you want to delete customers')
            .then(() => this.removeCustomers(), () => console.log('Not really'))
    }

    createDeleteButton(onClick) {
        return (
            <DeleteButton
                btnText='Delete Selected Customers'
                btnContextual='btn-danger'
                btnGlyphicon='glyphicon-trash'
                onClick={ () => this.handleDeleteButtonClick(onClick) }
            />
        );
    }

    onRowSelect(rowObject, isSelected) {
        if(isSelected && this.state.selected.findIndex(it => it.id === rowObject.id) < 0) {
            this.setState({selected: [...this.state.selected, rowObject]})
        } else {
            this.setState({
                selected: this.state.selected.filter(it => it.id !== rowObject.id)
            })
        }
    }

    onSelectAll(isSelected, rows) {
        if(!isSelected) {
            return this.setState({selected: []})
        } else {
            return this.setState({selected: rows})
        }
    }

	render() {
        const { properties, history } = this.props
        const customers = this.state.customers

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
                deleteBtn: ::this.createDeleteButton,
            },
            checkboxSettings: {
                mode: 'checkbox',
                customComponent: ::this.customMultiSelect,
                bgColor: 'rgba(0, 0, 0, .1)',
                onSelect: ::this.onRowSelect,
                onSelectAll: ::this.onSelectAll,
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
                        <BootstrapTable ref='customerTable' 
                            options={options.customer} data={customers} hover striped pagination={true}
                            selectRow={options.checkboxSettings} deleteRow
                            tableHeaderClass='custom-select-header-class' tableBodyClass='custom-select-body-class'
                        >
                            <TableHeaderColumn isKey={true} dataField="names">Customer Names</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={::this.phoneFormat} dataField="phone">Phone Number</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.propertyNameFormat} dataField="property">Property Name</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' columnClassName={ this.tableColors } dataField="status">Contract Status</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.dateFormat} dataField="startDate">Start Date</TableHeaderColumn>
                            <TableHeaderColumn dataAlign='center' dataFormat={::this.dateFormat} dataField="endDate">End Date</TableHeaderColumn>
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


class Checkbox extends Component {
  componentDidMount() { this.update(this.props.checked); }
  componentWillReceiveProps(props) { this.update(props.checked); }
  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === 'indeterminate';
  }
  render() {
    return (
      <input className='react-bs-select-all'
        type='checkbox'
        name={ 'checkbox' + this.props.rowIndex }
        id={ 'checkbox' + this.props.rowIndex }
        checked={ this.props.checked }
        onChange={ this.props.onChange } />
    );
  }
}

const filterFuction = obj => obj && !obj['deleted']

const mapStateToProps = state => ({
    customers: state.customers.filter(filterFuction),
    properties: state.properties.filter(filterFuction),
    users: state.users.filter(filterFuction),
})

export default connect(mapStateToProps)(Table)

import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { normalizePhone } from './lib'
import { connect } from 'react-redux'

let CustomerRenewal = props => {
    const {properties, initialValues, handleSubmit, minDate, reset, history} = props
    const { property } = initialValues
    const propertyObj = properties.filter(propertyVal => propertyVal.id === property)[0]

    return (
        <Row style={styles.container}>
            <Row>
                <form onSubmit={handleSubmit} className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        name="firstName"
                        placeholder="First Name"
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <Field
                        name="lastName"
                        placeholder="Last Name"
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="email">Email</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="customer@company.com"
                        className="form-control"
                    />

                    <label htmlFor="phone">Phone</label>
                    <Field
                        name="phone"
                        placeholder="+255626763274"
                        normalize={normalizePhone}
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="noticePeriod">Time to start notifications (Months)</label>
                    <Field
                        name="noticePeriod"
                        placeholder="Notify when 3 Months Remain"
                        component="input"
                        type="number"
                        max={12}
                        min={1}
                        className="form-control"
                    />

                    <label htmlFor="property">Property</label>
                    <Field
                        name="property"
                        component="select"
                        className="form-control"
                    >
                        <option value={propertyObj['name']}>{propertyObj['name']}</option>
                        {properties.map((property, index) => {
                            if(property.status === 'Vacant') {
                                return (
                                    <option value={property.id} key={index}>
                                        {property.name}
                                    </option>
                                )
                            }
                        })}
                    </Field>

                    <label htmlFor="startDate">Start Date</label>
                    <Field
                        name="startDate"
                        component="input"
                        type="date"
                        className="form-control"
                    />

                    <label htmlFor="endDate">End Date</label>
                    <Field
                        name="endDate"
                        component="input"
                        type="date"
                        min={minDate}
                        className="form-control"
                    />

                    <Row style={{marginTop: 10}}>
						<Col md={6}>
							<View width="100%" horizontalAlignment="center">
								<button className="btn btn-primary" type="submit">
									Submit
								</button>
							</View>
						</Col>
						<Col md={6}>
							<View width="100%" horizontalAlignment="center">
								<button className="btn btn-danger" onClick={reset}>
									Reset
								</button>
							</View>
						</Col>
                    </Row>
                </form>
            </Row>
        </Row>
    )
}

const formConfig = {
    form: 'customer_renewal'
}

const reduxConfig = state => {
    const {id} = state.customerTempEdits
    const customers = state.customers
    const properties = state.properties

    return {
        initialValues: customers.filter(customer => customer.id === id)[0],
        properties
    }
}

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    }
}

CustomerRenewal = reduxForm(formConfig)(CustomerRenewal)
export default connect(reduxConfig)(CustomerRenewal)


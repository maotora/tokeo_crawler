import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { normalizePhone, phoneNumber, maxLength15, minLength3, isAlphaNumeric, isEmail, required } from '../commons/lib'
import { renderField, renderFieldBootstrap } from '../commons'

let CustomerRenewal = props => {
    const {properties, initialValues, handleSubmit, minDate, reset, history} = props
    const { property } = initialValues
    const propertyObj = properties.filter(propertyVal => propertyVal.id === property)[0]

    return (
        <Row style={styles.container}>
            <Row>
                <form onSubmit={handleSubmit} className="form-group">
                    <Field
                        name="firstName"
                        placeholder="Hashim"
                        component={renderFieldBootstrap}
                        validate={[required, maxLength15, minLength3]}
                        label="First Name"
                        warn={isAlphaNumeric}
                        type="text"
                    />

                    <Field
                        name="lastName"
                        placeholder="Mbija"
                        component={renderFieldBootstrap}
                        validate={[required, maxLength15, minLength3]}
                        type="text"
                        warn={isAlphaNumeric}
                        label="Last Name"
                    />

                    <Field
                        name="email"
                        component={renderFieldBootstrap}
                        validate={[required, isEmail]}
                        type="email"
                        label="Email"
                        placeholder="customer@company.com"
                    />

                    <Field
                        name="phone"
                        label="Phone Number"
                        placeholder="+255626763274"
                        component={renderFieldBootstrap}
                        type="text"
                        normalize={normalizePhone}
                        validate={[required, phoneNumber]}
                        className="form-control"
                    />

                    <label htmlFor="noticePeriod">Time to start notifications (Months)</label>
                    <Field
                        name="noticePeriod"
                        placeholder="Notify when 3 Months Remain"
                        component="input"
                        type="number"
                        max={4}
                        min={1}
                        className="form-control"
                    />

                    <label htmlFor="property">Property</label>
                    <Field
                        name="property"
                        component="select"
                        className="form-control"
                    >
                        <option value={propertyObj['name']}> {propertyObj['name']} </option>
                        {properties.map((property, index) => {
                            if(property.status !== 'Occupied' && property.id !== propertyObj['id']) {
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
								<button className="btn btn-danger" type="button" onClick={reset}>
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

const filterFuction = obj => obj && !obj['deleted']

const reduxConfig = state => {
    const {id} = state.customerTempEdits
    const customers = state.customers.filter(filterFuction)
    const properties = state.properties.filter(filterFuction)

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

import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let CustomerRenewal = props => {
    const {properties, initialValues, handleSubmit, togglePassword, reset, history, getIndex} = props
    const { property } = initialValues
    getIndex(props.index)

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
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="property">Property</label>
                    <Field
                        name="property"
                        component="select"
                        className="form-control"
                    >
                        <option value={properties[property]['name']}>{properties[property]['name']}</option>
                        {properties.map((property, index) => {
                            if(property.status === 'Vacant') {
                                return (
                                    <option value={index} key={index}>
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
        initialValues: customers[id],
        index: id,
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


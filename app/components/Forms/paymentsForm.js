import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let PaymentsForm = props => {
    const {initialValues, properties, handleSubmit, togglePassword, reset, history} = props
    const { property } = initialValues
    const propertyObj = properties.filter(propertyVal => propertyVal.id === property)[0]

    return (
        <Row style={styles.container}>
            <Row>
                <form onSubmit={handleSubmit} className="form-group">
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
                    </Row>
                </form>
            </Row>
        </Row>
    )
}

const formConfig = {
    form: 'payment_form'
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

PaymentsForm = reduxForm(formConfig)(PaymentsForm)
export default connect(reduxConfig)(PaymentsForm)

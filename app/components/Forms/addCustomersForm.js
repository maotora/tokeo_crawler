import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let AddCustomer = props => {
    const {properties, handleSubmit, togglePassword, reset, history} = props

    return (
        <Row style={styles.container}>
            <Row style={{marginBottom: 20}}>
                <View width="100%" horizontalAlignment="center">
                    <button onClick={() => props.history.push('/admin')} className="btn btn-default">
                        Click to go back
                    </button>
                </View>
            </Row>
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
                        type="select"
                        className="form-control"
                    >
                        <option value="">Select Property</option>
                        {properties.map((property, index) => {
                            if(property.status === 'Vacant') {
                                return (
                                    <option value={index} key={index}>
                                        {`${property.name}, ${property.location}`}
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

                    <View width="100%" horizontalAlignment="center">
                        <Row style={{marginTop: 10}}>
                            <Col md={6}>
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                            </Col>
                            <Col md={6}>
                                    <button className="btn btn-danger" type="button" onClick={reset}>
                                        Reset
                                    </button>
                            </Col>
                        </Row>
                    </View>
                </form>
            </Row>
        </Row>
    )
}

const config = {
    form: 'add_customer'
}

const mapStateToProps = state => ({
    properties: state.properties
})

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    }
}

AddCustomer = reduxForm(config)(AddCustomer)
export default connect(mapStateToProps)(AddCustomer)

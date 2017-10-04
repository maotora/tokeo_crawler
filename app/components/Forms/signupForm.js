import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { normalizePhone } from './lib'
import { Field, reduxForm } from 'redux-form'

const SignUp = props => {
    const {handleSubmit, togglePassword, reset} = props

    return (
        <Row style={styles.container}>
            <Row>
                <form onSubmit={handleSubmit}>
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
                    <label htmlFor="username"> User Name </label>
                    <Field
                        name="username"
                        placeholder="User Name"
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        component="input"
                        type={(props.togglePassword) ? "text" : "password"}
                        className="form-control"
                    />

					<Col>
						<label htmlFor="show" className="checkbox-inline">
							<Field
								name="passwordToggle"
								id="show"
								component="input"
								type="checkbox"
								className="checkbox"
							/>
							Show Password
						</label>
					</Col>

                    <label htmlFor="email">Email</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        className="form-control"
						placeholder="admin@business.com"
                    />

                    <label htmlFor="licence_email">Licence Email</label>
                    <Field
                        name="licence_email"
                        component="input"
                        type="email"
                        className="form-control"
						placeholder="owner@business.com"
                    />

                    <label htmlFor="phone">Phone</label>
                    <Field
                        name="phone"
                        placeholder="+255626763274"
                        component="input"
                        type="text"
                        normalize={normalizePhone}
                        className="form-control"
                    />
                    <Row style={{marginTop: 20}}>
						<Col md={6}>
							<View width="100%" horizontalAlignment="center">
								<button className="btn btn-default" type="submit">
                                    Sign Up
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

const config = {
    form: 'sign_up'
}

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    }
}

export default reduxForm(config)(SignUp)

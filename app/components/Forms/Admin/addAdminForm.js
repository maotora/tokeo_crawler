import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { normalizePhone, phoneNumber, maxLength15, minLength3, isAlphaNumeric, isEmail, required } from '../commons/lib'
import { renderField, renderFieldBootstrap } from '../commons'

const AddAdmin = props => {
    const {handleSubmit, togglePassword, reset} = props

    return (
        <Row style={styles.container}>
            <Row style={{marginBottom: 20}}>
                <View width="100%" horizontalAlignment="center">
                    <button
						onClick={() => props.history.goBack()}
						className="btn btn-default"
						type="button"
					>
                        Click to go back
                    </button>
                </View>
            </Row>
            <Row>
                <form onSubmit={handleSubmit}>
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
                        name="username"
                        placeholder="Whatever"
                        component={renderFieldBootstrap}
                        validate={[required, maxLength15, minLength3]}
                        type="text"
                        warn={isAlphaNumeric}
                        label="Username"
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

					<View 
						width="100%"
						horizontalAlignment="center"
						style={{marginTop: 10, marginBottom: 20}}
					>
						<label htmlFor="admin" className="radio-inline">
							<Field
								name="role"
								id="admin"
								value="Administrator"
								component="input"
								type="radio"
								className="radio"
							/>
							Administrator
						</label>

						<label htmlFor="moderator" className="radio-inline">
							<Field
								name="role"
								id="moderator"
								value="moderator"
								component="input"
								type="radio"
								className="radio"
							/>
							Moderator
						</label>

						<label htmlFor="owner" className="radio-inline">
							<Field
								name="role"
								id="owner"
								value="owner"
								component="input"
								type="radio"
								className="radio"
							/>
							Owner
						</label>
					</View>
                    <Row>
						<Col md={6}>
							<View width="100%" horizontalAlignment="center">
								<button className="btn btn-default" type="submit">
									Add Admin
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
    form: 'add_admin'
}

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    }
}

export default reduxForm(config)(AddAdmin)

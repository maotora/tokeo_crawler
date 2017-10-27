import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { normalizePhone, phoneNumber, maxLength15, minLength3, isAlphaNumeric, isEmail, required } from '../commons/lib'
import { renderField, renderFieldBootstrap } from '../commons'

let EditAdmin = props => {
    const {handleSubmit, togglePassword, reset} = props

    return (
        <Row style={styles.container}>
            <Row style={{marginBottom: 20}}>
                <View width="100%" horizontalAlignment="center">
                    <button
						onClick={() => props.history.goBack()} type="button"
						className="btn btn-default"
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
						style={{margin: 10}}
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

						<label htmlFor="viewer" className="radio-inline">
							<Field
								name="role"
								id="viewer"
								value="Viewer"
								component="input"
								type="radio"
								className="radio"
							/>
							Viewer
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
    form: 'edit_admin',
}

const filterFuction = obj => obj && !obj['deleted']

const reduxConfig = state => {
    const {id} = state.userTempEdits
    const users = state.users.filter(filterFuction)
    const user = users.filter(user => user.id === id)[0]

    return {
        initialValues: user,
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

EditAdmin = reduxForm(formConfig)(EditAdmin)
export default connect(reduxConfig)(EditAdmin)

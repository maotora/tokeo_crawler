import React from 'react';
import { View, Text, Button, TextInput, Checkbox, Radio } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'

const AddAdmin = props => {
    const {handleSubmit, togglePassword, reset} = props

    return (
        <Row style={styles.container}>
            <Row style={{marginBottom: 20}}>
                <View width="100%" horizontalAlignment="center">
                    <button
						onClick={() => props.history.push('/admin')}
						className="btn btn-default"
					>
                        Click to go back
                    </button>
                </View>
            </Row>
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
						placeholder="admin@mijengo.com"
                    />

                    <label htmlFor="phone">Phone</label>
                    <Field
                        name="phone"
                        placeholder="+255626763274"
                        component="input"
                        type="text"
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
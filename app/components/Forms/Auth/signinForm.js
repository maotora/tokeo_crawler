import React from 'react';
import { View } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const SignIn = props => {
    const {handleSubmit, reset} = props

    return (
        <Row style={styles.container}>
            <Row>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">User Name</label>
                    <Field
                        name="username"
                        placeholder="Username"
                        component="input"
                        type="text"
                        className="form-control"
                    />
                    <label style={{marginTop: 20}} htmlFor="username">Password</label>
                    <Field
                        name="password"
                        component="input"
                        placeholder="Password"
                        type="password"
                        className="form-control"
                        style={{marginBottom: 20}}
                    />
                    <Row>
						<Col md={4}>
							<View width="100%" horizontalAlignment="center">
								<button className="btn btn-default" type="submit">
                                    Sign In
								</button>
							</View>
						</Col>
						<Col md={4}>
							<View width="100%" horizontalAlignment="center">
                                <button className="btn btn-warning" type="button"
                                    onClick={() => props.dispatch({type: 'RECOVER_PASSWORD'})}>
									Recover Password
								</button>
							</View>
						</Col>
						<Col md={4}>
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
    form: 'sign_in'
}

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    },
}

const composedSignInForm = reduxForm(config)(SignIn)

export default connect()(composedSignInForm)
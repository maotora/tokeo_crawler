import React from 'react';
import { View, Text } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { normalizePrice } from '../commons/lib'
import { connect } from 'react-redux'

let AddPropertyForm = props => {
    const {users, handleSubmit, reset} = props
    const propertyType = ['Apartment', 'House', 'Room', 'Frame', 'Floor', 'Building', 'Other']

    return (
        <Row style={styles.container}>
            <Row style={{marginBottom: 20}}>
                <View width="100%" horizontalAlignment="center">
                    <button onClick={() => props.history.goBack()} className="btn btn-default" type="button">
                        Click to go back
                    </button>
                </View>
            </Row>
            <Row>
                <form onSubmit={handleSubmit} className="form-group">
                    <label htmlFor="name">Property Number / Name</label>
                    <Field
                        name="name"
                        placeholder="Frame No. 8 / Room No. 102 / TZ Towers"
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="type">Property Type & Count</label>
                    <View width="100%" horizontalAlignment="center">
                        <Field
                            name="propertyType"
                            component="select"
                            type="select"
                            className="form-control"
                        >
                            <option value="">Property Types</option>
                            {propertyType.map((type, index) => {
                                return (
                                    <option value={type} key={index}>
                                        {type}
                                    </option>
                                )
                            })}
                        </Field>

                        <Field
                            name="propertyCount"
                            component="input"
                            type="number"
                            placeholder="How many?"
                            className="form-control"
                        />
                    </View>

                    <label htmlFor="location">Property Location</label>
                    <Field
                        name="location"
                        placeholder="Dodoma, Ilazo"
                        component="input"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="description">Property Description</label>
                    <Field
                        name="description"
                        component="textarea"
                        rows="4"
                        placeholder="Two stories building along the mainroad"
                        className="form-control field span2"
                    />

                    <label htmlFor="owner">Property Owner</label>
                    <Field
                        name="owner"
                        component="select"
                        type="select"
                        className="form-control"
                    >
                        <option value="">Select Owner</option>
                        {users.map((user, index) => {
                            if(user.role === 'owner') {
                                return (
                                    <option key={index} value={user.id}>
                                        {user.names}
                                    </option>
                                )
                            }
                        })}
                    </Field>

                    <label htmlFor="price">Property Price (Tsh)</label>
                    <Field
                        name="price"
                        placeholder="200,000"
                        component="input"
                        type="text"
                        normalize={normalizePrice}
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
    form: 'add_property'
}

const styles = {
    container: {
        padding: 50,
        width: 400,
        margin: 10,
        backgroundColor: 'rgba(65, 138, 63, .4)'
    }
}

const filterFuction = obj => obj && !obj['deleted']

const mapStateToProps = state => ({
    users: state.users.filter(filterFuction),
})

AddPropertyForm = reduxForm(formConfig)(AddPropertyForm)
export default connect(mapStateToProps)(AddPropertyForm)

import React from 'react';
import { View, Text } from 'react-desktop/windows'
import { Container, Row, Col } from 'react-grid-system'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let EditPropertyForm = props => {
    const {getIndex, initialValues, handleSubmit, reset} = props
    getIndex(props.index)

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
                    <label htmlFor="name">Property Name</label>
                    <Field
                        name="name"
                        placeholder="House/Frame/2nd Floor"
                        component="input"
                        type="text"
                        className="form-control"
                    />

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
                        component="input"
                        placeholder="Mr. Landlord"
                        type="text"
                        className="form-control"
                    />

                    <label htmlFor="price">Property Price (Tsh)</label>
                    <Field
                        name="price"
                        placeholder="200,000/="
                        component="input"
                        type="text"
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
    form: 'edit_property'
}

const reduxConfig = state => {
    const {id} = state.propertyTempEdits
    const properties = state.properties

    return {
        initialValues: properties[id],
        index: id
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

EditPropertyForm = reduxForm(formConfig)(EditPropertyForm)
export default connect(reduxConfig)(EditPropertyForm)

import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const renderField = ({
    input,
    label,
    type,
    meta: {touched, error, warning}
}) => (
    <div>
        <label>{label}</label>
        <div className="form-group">
            <input {...input} type={type} />
                {touched &&
                    ((error && <span> {error} </span>) ||
                    (warning && <span> {warning} </span>))}
        </div>
    </div>
)

export const renderFieldBootstrap = ({
    input,
    label,
    type,
    placeholder,
    meta: {touched, error, warning}
}) => (
    do {
        if(touched && error) {
            <div className="form-group has-error">
                <label className="control-label">{label}</label>
                <input placeholder={placeholder} {...input} className="form-control" type={type} />
                <span className="help-block">{error}</span>
            </div>
        } else if(touched && warning) {
            <div className="form-group has-warning">
                <label className="control-label">{label}</label>
                <input placeholder={placeholder} {...input} className="form-control" type={type} />
                <span className="help-block">{warning}</span>
            </div>
        } else {
            <div className="form-group">
                <label className="control-label">{label}</label>
                <input {...input} placeholder={placeholder} className="form-control" type={type} />
            </div>
        }
    }
)

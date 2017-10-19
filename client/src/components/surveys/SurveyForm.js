import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            // ^^ this pull label and name off of the field variable instead of field.lable or field.name
            return (
                <Field 
                    key={name} 
                    type="text" 
                    component={SurveyField} 
                    label={label} 
                    name={name}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                        {/* the word between the i tags is a key word used with material to create the icon */}
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    
    errors.emails = validateEmails(values.emails || '');
    // ^^ the or statement takes care of when there are no emails provided

    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must have a ${name}!`
        }
    });



    // ^^ properties being added to the errors object must be the name values of the Fields. 
    // that is how redux form know how to connect what error to which field. And passes it as a prop
    return errors;
}

export default reduxForm({
    validate,
    // validate: validate,
    // ^^ the value 'validate' is referring to the function validate above
    form: 'surveyForm'
})(SurveyForm);
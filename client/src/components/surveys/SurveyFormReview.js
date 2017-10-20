// SurveyFormreview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
    // ^^ onCancel is destructured from this.props.onCancel. 
    // formValues comes from setting it on state in mapStateToProps
    const reviewFields = _.map(formFields, ({ name, label }) => {
                                            // ^^ this is pulling name and label off of the field object
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            {/* ^^ because we're producing a list, each div must have a key */}
            <button className="yellow white-text darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green white-text btn-flat right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
    // ^^ setting surveyForm values on the formValues prop of state
}

export default connect(mapStateToProps)(SurveyFormReview);
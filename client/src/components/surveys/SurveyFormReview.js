// SurveyFormreview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
// ^^ give me all my action creators

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    // ^^ onCancel is destructured from this.props.onCancel. 
    // formValues comes from setting it on state in mapStateToProps
    // history comes from withRouter at the bottom
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
            <button 
                onClick={() => submitSurvey(formValues, history)} 
                className="green white-text btn-flat right"
                >
                {/* ^^ using an arrow function prevents it from running before it's actually clicked, submitSurvey is an action creator that comes from props */}
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

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
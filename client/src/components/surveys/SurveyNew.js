// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {showFormReview: false}
    // }
    // 100% the same as the statement below
    state = { showFormReview: false };
    // ^^ this is component level state. Simple way provided by create-react-app

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview 
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
        // ^^ this creates a function called onSurveySubmit on the state object
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm',
    // ^^ adding this here clears out the form values because we are not saying to
    // hold onto the values even if unmounted
})(SurveyNew);
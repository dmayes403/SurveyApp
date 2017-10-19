// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
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
            return <SurveyFormReview />;
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

export default SurveyNew;
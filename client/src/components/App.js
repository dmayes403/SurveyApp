import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard'

const SurveyView = () => <h2>SurveyView</h2>

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        //^^ props comes from actions being passed to the connect function below
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        {/* ^^ exact is required to not pull in multiple componenets with route beginning with '/' */}
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyView} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);
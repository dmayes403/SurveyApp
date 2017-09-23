import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyView = () => <h2>SurveyView</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
    return (
        <div>
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
};

export default App;
import React from "react";
import PropTypes from 'prop-types';
import {
    StaticRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Header from './Header';

import Home from './pages/Home';
import Create from "./pages/Create";
import Browse from "./pages/Browse";
import View from "./pages/View";

class AppServer extends React.Component {

    updateCreateSet = (set) => {
        this.setState({
            create: set
        });
    };

    render () {
        return (
            <Router location={this.props.url}>
                <div className="App">
                    <Header />
                    <div id="page-body" className="container">
                        <Switch>
                            <Route path="/" exact >
                                <Home />
                            </Route>
                            <Route path="/create" >
                                <Create name={this.props.create.name} dice={this.props.create.dice} author={this.props.create.author} updateCreateSet={this.updateCreateSet}/>
                            </Route>
                            <Route path="/browse" component={Browse} exact />
                            <Route path="/browse/:id" component={View} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

AppServer.propTypes = {
    create:PropTypes.object.isRequired,
    url:PropTypes.string.isRequired,
};

export default AppServer;

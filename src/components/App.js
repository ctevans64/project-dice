import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Header from './Header';

import Home from './pages/Home';
import Create from "./pages/Create";
import Browse from "./pages/Browse";
import View from "./pages/View";

class App extends React.Component {
    render () {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div id="page-body" className="container">
                        <Switch>
                            <Route path="/" exact >
                                <Home />
                            </Route>
                            <Route path="/create" >
                                <Create />
                            </Route>
                            <Route path="/browse">
                                <Browse />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

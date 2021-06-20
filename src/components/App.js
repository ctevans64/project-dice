import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import Header from './Header';

import Home from './pages/Home';
import Create from "./pages/Create";
import Browse from "./pages/Browse";
import View from "./pages/View";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

class App extends React.Component {

    state = {
        create: initialData.create
    }

    updateCreateSet = (set) => {
        this.setState({
            create: set
        });
    };

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
                                <Create name={this.state.create.name} dice={this.state.create.dice} author={this.state.create.author} updateCreateSet={this.updateCreateSet}/>
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

export default App;

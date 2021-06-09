import React from 'react';
import PropTypes from 'prop-types';

import * as api from '../api';

class App extends React.Component {

    static propTypes = {
        initialData: PropTypes.object.isRequired,
    }

    state = this.props.initialData;

    componentDidMount() {
        // Start any timeouts
    }

    componentWillUnmount() {
        // End any timeouts
    }


    render() {
        return (
            <div className="App">
                <h1>Hello</h1>
                <p>This is the start of the app.</p>
            </div>
        );
    }
}

export default App;
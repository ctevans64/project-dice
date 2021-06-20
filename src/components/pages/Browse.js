import React from 'react';
import {Link} from 'react-router-dom';

class Browse extends React.Component {

    componentDidMount() {
        // Start any timeouts
    }

    componentWillUnmount() {
        // End any timeouts
    }


    render() {
        console.log(this.props);
        return (
            <div className="Browse">
                <p>Browse content here</p>
                <Link to="/browse/60cf6d46bfb05b2e0c23c1da">60cf6d46bfb05b2e0c23c1da</Link>
            </div>
        );
    }
}

export default Browse;
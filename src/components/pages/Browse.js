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
                <Link to="/browse/60cd02c756a631410420e420">60cd02c756a631410420e420</Link>
            </div>
        );
    }
}

export default Browse;
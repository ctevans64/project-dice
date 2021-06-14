import React from 'react';

class View extends React.Component {

    componentDidMount() {
        // Start any timeouts
    }

    componentWillUnmount() {
        // End any timeouts
    }


    render() {
        return (
            <div className="View">
                <p>View content here</p>
            </div>
        );
    }
}

export default View;
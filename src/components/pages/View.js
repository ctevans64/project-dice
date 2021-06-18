import React from 'react';

class View extends React.Component {


    render() {
        let _id = this.props.match.params.id;
        return (
            <div className="View">
                <p>View content here: {_id}</p>
            </div>
        );
    }
}

export default View;
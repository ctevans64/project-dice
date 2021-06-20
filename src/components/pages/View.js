import React from 'react';
import {getSet} from '../../api';
import ViewSet from '../ViewSet';

class View extends React.Component {
    state = {
        set: {}
    }

    componentDidMount(){
        let _id = this.props.match.params.id;
        getSet(_id).then((response) => {
            this.setState({
                set:response
            });
        });
    }

    render() {
        console.log(this.state.set);

        return (
            <div className="View" className="mt-3">
                {("_id" in this.state.set) ? <ViewSet set={this.state.set} /> : (
                    <>
                        <h3>Not Found</h3>
                        <p>The set you specified was not found.</p>
                    </>
                )}
            </div>
        );
    }
}

export default View;
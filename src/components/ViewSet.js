import React from "react";
import PropTypes from 'prop-types';

class ViewSet extends React.Component {

    state = {
        selected: []
    };

    componentDidMount() {
        this.randomize();
    }

    //Roll the dice
    randomize = () => {
        let selected = []
        for(const i in this.props.set.dice){
            selected[i] = Math.ceil(Math.random()*this.props.set.dice[i].sides.length);
        }
        this.setState({
            selected
        });
    }


    render() {
        let headertext = (
            <div className="card-header">
                <h5>{this.props.set.name}</h5> by {this.props.set.author}
            </div>
        );
        return (
            <div className="ViewSet card text-dark bg-light mb-3">

                {(this.props.set.name == "" || this.props.set.author == "" ? "" : headertext)}
                <div className="card-body">
                    {this.props.set.dice.map((die, index) => (
                        <div key={index}>
                            <div className="mb-3">
                                <label htmlFor={`nameEdit_${this.props.set.name}_${this.props.set.author}_${index}`} className="form-label">{die.name}:</label>
                                <select className="form-select" id={`dieSelect_${this.props.set.name}_${this.props.set.author}_${index}`} value={this.state.selected[index]}>
                                    {die.sides.map( (side, sideIndex) => (
                                        <option key={sideIndex} value={sideIndex} >{side}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={this.randomize}>Re-roll</button>
                </div>
            </div>
        );
    }
}

ViewSet.propTypes = {
    set:PropTypes.object.isRequired,
};

export default ViewSet;

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class EditDice extends React.Component {

    //Push props to state to try and fix bug with elements not being removed
    constructor(props) {
        super();
        this.state = {
            dieIndex: props.dieIndex,
            dieName: props.dieName,
            dieSides: props.dieSides,
        };
    }

    changeSide = (index, event) => {
        let sides = this.state.dieSides;
        sides[index] = event.target.value;
        this.setState({
            dieSides: sides,
        });
        this.state.updateSides(this.state.dieIndex, sides);
    };

    addSide = () => {
        let sides = this.state.dieSides;
        sides.push("New Side");
        this.setState({
            dieSides: sides,
        });
        this.state.updateSides(this.state.dieIndex, sides);
    };

    removeSide = (index) => {
        let sides = this.state.dieSides;
        sides.splice(index, 1);
        this.setState({
            dieSides: sides,
        });
        this.state.updateSides(this.state.dieIndex, sides);
    };

    changeName = (event) => {
        this.setState({
            dieName: event.target.value,
        });
        this.state.updateDieName(event.target.value);
    };

    render() {
        return (
            <div className="EditDice accordion-item">
                <h2 className="accordion-header" id={`headingDie_${this.state.dieIndex}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseDie_${this.state.dieIndex}`} aria-expanded="true" aria-controls={`collapseDie_${this.state.dieIndex}`}>
                        {this.state.dieName}
                    </button>
                </h2>
                <div id={`collapseDie_${this.state.dieIndex}`} className={`accordion-collapse collapse ${(this.state.dieIndex === 0) ? "show" : ""}`} aria-labelledby={`headingDie_${this.state.dieIndex}`} data-bs-parent="#editDice">
                    <div className="accordion-body">
                        <div className="mb-3">
                            <label htmlFor={`nameEdit_${this.state.dieIndex}`} className="form-label">Die Name:</label>
                            <input type="text" className="form-control" id={`nameEdit_${this.state.dieIndex}`} value={this.state.dieName} onChange={this.changeName} />
                        </div>
                        <hr />
                        {this.state.dieSides.map( (side, sideIndex) => (
                            <div className="mb-3" key={sideIndex}>
                                <label htmlFor={`sideEdit_${this.state.dieIndex}_${sideIndex}`} className="form-label">Side {sideIndex+1}</label>
                                <div className="row g-3">
                                    <div className="col-11">
                                        <input type="text" className="form-control" id={`sideEdit_${this.state.dieIndex}_${side}`} value={side} onChange={(event) => this.changeSide(sideIndex, event) } />
                                    </div>
                                    <div className="col-1">
                                        <button type="button" className="btn btn-danger"><FontAwesomeIcon icon={faTimesCircle} onClick={() => {this.removeSide(sideIndex)}}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn" onClick={this.addSide}>New Side</button>
                    </div>
                </div>
            </div>
        );
    }
}

EditDice.propTypes = {
    dieIndex:PropTypes.number.isRequired,
    dieName:PropTypes.string.isRequired,
    dieSides: PropTypes.array.isRequired,
    updateDieName: PropTypes.func.isRequired,
    updateSides: PropTypes.func.isRequired,
};

export default EditDice;

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class EditDice extends React.Component {

    changeSide = (index, event) => {
        let sides = this.props.dieSides;
        sides[index] = event.target.value;
        this.props.updateSides(this.props.dieIndex, sides);
    };

    addSide = () => {
        let sides = this.props.dieSides;
        sides.push("New Side");
        this.props.updateSides(this.props.dieIndex, sides);
    };

    removeSide = (index) => {
        let sides = this.props.dieSides;
        sides.splice(index, 1);
        this.props.updateSides(this.props.dieIndex, sides);
    };

    changeName = (event) => {
        this.props.updateDieName(this.props.dieIndex, event.target.value);
    };

    render() {
        return (
            <div className="EditDice accordion-item">
                <h2 className="accordion-header" id={`headingDie_${this.props.dieIndex}`}>
                    <button className={`accordion-button ${(this.props.dieIndex === 0) ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseDie_${this.props.dieIndex}`} aria-expanded={(this.props.dieIndex === 0) ? "true" : "false"} aria-controls={`collapseDie_${this.props.dieIndex}`}>
                        {this.props.dieName}
                    </button>
                </h2>
                <div id={`collapseDie_${this.props.dieIndex}`} className={`accordion-collapse collapse ${(this.props.dieIndex === 0) ? "show" : ""}`} aria-labelledby={`headingDie_${this.props.dieIndex}`} data-bs-parent="#editDice">
                    <div className="accordion-body">
                        <div className="mb-3">
                            <label htmlFor={`nameEdit_${this.props.dieIndex}`} className="form-label">Die Name:</label>
                            <input type="text" className="form-control" id={`nameEdit_${this.props.dieIndex}`} value={this.props.dieName} onChange={this.changeName} />
                        </div>
                        <hr />
                        {this.props.dieSides.map( (side, sideIndex) => (
                            <div className="mb-3" key={sideIndex}>
                                <label htmlFor={`sideEdit_${this.props.dieIndex}_${sideIndex}`} className="form-label">Side {sideIndex+1}</label>
                                <div className="row g-3">
                                    <div className="col-10">
                                        <input type="text" className="form-control" id={`sideEdit_${this.props.dieIndex}_${side}`} value={side} onChange={(event) => this.changeSide(sideIndex, event) } />
                                    </div>
                                    <div className="col-2">
                                        <button type="button" className="btn btn-danger" onClick={() => {this.removeSide(sideIndex)}} >
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary me-1" onClick={this.addSide}>Add new Side</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.props.removeDice(this.props.dieIndex)}>Remove Dice</button>
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
    removeDice: PropTypes.func.isRequired,
};

export default EditDice;

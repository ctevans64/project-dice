import React from 'react';
import {Link} from 'react-router-dom';

import {getSets} from '../../api';

class Browse extends React.Component {

    state = {
        sets: [],
        query: "",
        loading: true
    }

    componentDidMount() {
        this.search();
    }

    changeQuery = (event) => {
        this.setState({
            query: event.target.value
        });
    }

    search = (event) => {
        if(event){
            event.preventDefault();
        }
        this.setState({
            sets: [],
            loading: true
        });
        getSets(this.state.query).then((sets) => {
            for(const setIndex in sets){
                sets[setIndex].selected = [];
                for(const i in sets[setIndex].dice){
                    sets[setIndex].selected[i] = Math.ceil(Math.random()*sets[setIndex].dice[i].sides.length);
                }
            }
            this.setState({
                sets: sets,
                loading: false
            });
        }).catch(()=> {
            this.setState({
                sets: [],
                loading: false

            });
        });
    }

    //Roll the dice
    randomize = (setIndex) => {
        let selected = [];
        let sets = this.state.sets;
        for(const i in sets[setIndex].dice){
            selected[i] = Math.ceil(Math.random()*sets[setIndex].dice[i].sides.length);
        }
        sets[setIndex].selected = selected;
        this.setState({sets});
    }

    changeDie(set, die, event){
        let sets = this.state.sets;
        sets[set].selected[die] = event.target.value;
        this.setState({sets});
    }


    render() {
        return (
            <div className="Browse" className="mt-3">
                <div className="mb-3">
                    <form onSubmit={this.search}>
                        <div className="row">
                            <div className="col-sm-8 col-md-10">
                                <input type="text" className="form-control" id="searchTerm" aria-describedby="searchTermHelp" value={this.props.query} onChange={this.changeQuery} placeholder="Search"/>
                                <div id="searchTermHelp" className="form-text">Filter results by entering text.</div>
                            </div>
                            <div className="col-sm-4 col-md-2">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mb-3">
                    {(this.state.loading) ? (<p>Loading...</p>) : (
                        <>
                            {(this.state.sets.length === 0) ? (
                                <h6>No dice sets found</h6>
                            ) : (
                                <div className="accordion" id="viewDice">
                                {this.state.sets.map((set, setIndex)=> (
                                    <div className="EditDice accordion-item" key={setIndex}>
                                        <h2 className="accordion-header" id={`headingDie_${setIndex}`}>
                                            <button className={`accordion-button ${(setIndex === 0) ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseDie_${setIndex}`} aria-expanded={(setIndex === 0) ? "true" : "false"} aria-controls={`collapseDie_${setIndex}`}>
                                                <span className="fw-bold">{set.name}</span>&nbsp;by {set.author}
                                            </button>
                                        </h2>
                                        <div id={`collapseDie_${setIndex}`} className={`accordion-collapse collapse ${(setIndex === 0) ? "show" : ""}`} aria-labelledby={`headingDie_${setIndex}`} data-bs-parent="#viewDice">
                                            <div className="accordion-body">
                                                {set.dice.map((die, index) => (
                                                    <div key={index}>
                                                        <div className="mb-3">
                                                            <label htmlFor={`nameEdit_${set.name}_${set.author}_${index}`} className="form-label">{die.name}:</label>
                                                            <select className="form-select" id={`dieSelect_${set.name}_${set.author}_${index}`} value={set.selected[index]} onChange={(event)=> this.changeDie(setIndex, index, event)}>
                                                                {die.sides.map( (side, sideIndex) => (
                                                                    <option key={sideIndex} value={sideIndex} >{side}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-primary me-3" onClick={() => this.randomize(setIndex)}>Re-roll</button>
                                                <Link to={`/browse/${set._id}`} >Permalink</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                        </>
                    )}                    
                </div>
            </div>
        );
    }
}

export default Browse;
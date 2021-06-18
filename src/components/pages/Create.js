import React from 'react';
import PropTypes from 'prop-types';

import EditDice from "../EditDice";
import {saveCreate, publishCreate} from '../../api';
import ViewSet from '../ViewSet';

class Create extends React.Component {

    //Pass updated set up to app level
    changeName = (event) => {
        this.props.updateCreateSet({
            name: event.target.value,
            author: this.props.author,
            dice: this.props.dice,
        });
    }
    changeAuthor = (event) => {
        this.props.updateCreateSet({
            author: event.target.value,
            name: this.props.name,
            dice: this.props.dice,
        });
    }

    updateSides = (dieIndex, dieSides) => {
        let dice = this.props.dice;
        dice[dieIndex].sides = dieSides;
        this.props.updateCreateSet({
            name: this.props.name,
            author: this.props.author,
            dice
        });
    };

    updateDieName = (dieIndex, dieName) => {
        let dice = this.props.dice;
        dice[dieIndex].name = dieName;
        this.props.updateCreateSet({
            name: this.props.name,
            author: this.props.author,
            dice
        });
    };

    addDie = () => {
        let dice = this.props.dice;
        dice.push({
            name: "New Die",
            sides:["New Side"]
        });
        this.props.updateCreateSet({
            name: this.props.name,
            author: this.props.author,
            dice
        });
    };

    removeDie = (dieIndex) => {
        let dice = this.props.dice;
        dice.splice(dieIndex, 1);
        this.props.updateCreateSet({
            name: this.props.name,
            author: this.props.author,
            dice
        });
    };

    publish = () => {
        //Save to database
        publishCreate({
            name: this.props.name,
            author: this.props.author,
            dice: this.props.dice
        }).then((response)=> {
            console.log(response);
        });
        //Clear set from session
        //Navigate to permalink
    }

    componentWillUnmount(){
        // Save current set to session
        saveCreate({
            name: this.props.name,
            author: this.props.author,
            dice: this.props.dice
        });
    }

    render() {
        return (
            <div className="Create mt-2">
                <h3>Create your own dice set:</h3>
                <form>
                    <div className="mb-3">
                        <div className="accordion" id="editDice">
                        {this.props.dice.map( (die, dieIndex) => (
                            <EditDice key={`die_${dieIndex}`}
                                updateSides={this.updateSides}
                                dieIndex={dieIndex}
                                dieName={die.name}
                                dieSides={die.sides}
                                updateDieName={this.updateDieName}
                                removeDice={this.removeDie} />
                        ))}
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.addDie}>Add new Die</button>
                    <hr />

                    <h3>Preview:</h3>
                    <ViewSet set={{
                        name: this.props.name,
                        author: this.props.author,
                        dice: this.props.dice
                    }} />
                    <hr />

                    <div id="publish" className="mt-3">
                        <h3>Publish:</h3>
                        <p>If you wanted to publish your set to share it with others, please add the additional info Below.</p>

                        <div className="mb-3">
                            <label htmlFor="dieName" className="form-label">Set Name</label>
                            <input type="text" className="form-control" id="dieName" aria-describedby="dieNameHelp" value={this.props.name} onChange={this.changeName}/>
                            <div id="dieNameHelp" className="form-text">Here you can give your dice set a theme or title that helps others identify what it is for.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="authorName" className="form-label">Your Name</label>
                            <input type="text" className="form-control" id="authorName" value={this.props.author} onChange={this.changeAuthor}/>
                        </div>

                        <div className="mb-3">
                            <button type="button" className="btn btn-success btn-lg" onClick={this.publish}>Publish</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Create.propTypes = {
    name:PropTypes.string.isRequired,
    dice:PropTypes.array.isRequired,
    author:PropTypes.string.isRequired,
    updateCreateSet: PropTypes.func.isRequired,
};

export default Create;
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import EditDice from "../EditDice";
import {saveCreate, publishCreate} from '../../api';
import ViewSet from '../ViewSet';

class Create extends React.Component {

    state = {
        runValidation: false,
        serverError: false,
        redirect: false,
        redirectTo: ""
    }

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
        //vlaidate form
        this.setState({
            runValidation: true
        });
        if(this.props.name !== "" && this.props.author !== ""){
            //Save to database
            publishCreate({
                name: this.props.name,
                author: this.props.author,
                dice: this.props.dice
            }).then((response)=> {
                //Valid response
                if("_id" in response){
                    //Clear set
                    this.props.updateCreateSet({
                        name: "",
                        author: this.props.author,
                        dice: []
                    });
                    //Navigate to permalink
                    this.setState({
                        redirect: true,
                        redirectTo: `/browse/${response._id}`,
                    });
                //Invalid response
                }else{
                    this.setState({
                        serverError: true
                    });
                }
            });
        }

        
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
                        <p>If you wanted to publish your set to share it with others, please add the additional info below.</p>

                        <div className="mb-3">
                            <label htmlFor="dieName" className="form-label">Set Name</label>
                            <input type="text" className={`form-control ${(this.state.runValidation && this.props.name === "") ? "is-invalid" : "" }`} id="dieName" aria-describedby="dieNameHelp authorNameFeedback" value={this.props.name} onChange={this.changeName}/>
                            <div id="authorNameFeedback" className="invalid-feedback">
                                Please provide a name for the set of dice.
                            </div>
                            <div id="dieNameHelp" className="form-text">Here you can give your dice set a theme or title that helps others identify what it is for.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="authorName" className="form-label">Your Name</label>
                            <input type="text" className={`form-control ${(this.state.runValidation && this.props.author === "") ? "is-invalid" : "" }`} id="authorName" aria-describedby="authorNameFeedback" value={this.props.author} onChange={this.changeAuthor}/>
                            <div id="authorNameFeedback" className="invalid-feedback">
                                Please provide your name.
                            </div>
                        </div>

                        {(this.state.serverError) ? (<div className="mb-3"><p className="text-danger">An error occured while processing your request. Please try again later.</p></div>) : ""}
                        

                        <div className="mb-3">
                            <button type="button" className="btn btn-success btn-lg" onClick={this.publish}>Publish</button>
                        </div>

                        {(this.state.redirect) ? (<Redirect push to={this.state.redirectTo} />) : ""}
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
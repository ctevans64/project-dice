import React from 'react';
import EditDice from "../EditDice";

class Create extends React.Component {

    // For now die is hard coded
    state = {
        name: "Test",
        set: [
            {
                name: "First dice",
                sides: [
                    "One",
                    "Two",
                    "Three"
                ]
            },
            {
                name: "Elements",
                sides: [
                    "Earth",
                    "Wind",
                    "Fire"
                ]
            }
        ]
    };


    changeName = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    updateSides = (dieIndex, dieSides) => {
        let set = this.state.set;
        set[dieIndex].sides = dieSides;
        this.setState({
            set
        });
    };

    updateDieName = (dieIndex, dieName) => {
        let set = this.state.set;
        set[dieIndex].name = dieName;
        this.setState({
            set
        });
    };

    componentDidMount() {
        // Start any timeouts
        console.log(this.state);
    }

    componentWillUnmount() {
        // End any timeouts
    }

    render() {
        return (
            <div className="Create mt-2">
                <h3>Create your own dice set:</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="dieName" className="form-label">Set Name</label>
                        <input type="text" className="form-control" id="dieName" aria-describedby="dieNameHelp" value={this.state.name} onChange={this.changeName}/>
                        <div id="dieNameHelp" className="form-text">Here you can give your dice set a theme or title that helps others identify what it is for.</div>
                    </div>
                    <div className="mb-3">
                        <h4>Add Dice:</h4>
                        <div className="accordion" id="editDice">
                        {this.state.set.map( (die, dieIndex) => (
                            <EditDice key={`die_${dieIndex}`} updateSides={this.updateSides} dieIndex={dieIndex} dieName={die.name} dieSides={die.sides} updateDieName={this.updateDieName} />
                        ))}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Publish</button>
                </form>
            </div>
        );
    }
}

export default Create;
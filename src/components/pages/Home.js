import React from 'react';
import {Link} from 'react-router-dom';
import ViewSet from '../ViewSet';

class Home extends React.Component {

    state = {
        invention: {
            name: "Invention Dice",
            author: "Atomic Shrimp",
            dice: [
                {
                    name: "Power",
                    sides: [
                        "Manual",
                        "Solar",
                        "Wind",
                        "Water",
                        "Electric",
                        "Clockwork"
                    ]
                },
                {
                    name: "Implementation",
                    sides: [
                        "Underwater",
                        "Flying",
                        "Self-build",
                        "Stealth",
                        "Random",
                    ]
                },
                {
                    name: "Application",
                    sides: [
                        "Personal",
                        "Office",
                        "Industrial",
                        "Public",
                        "Family",
                        "Home",
                    ]
                },
                {
                    name: "Scale",
                    sides: [
                        "Miniature",
                        "Portable",
                        "Wearable",
                        "Inhabitable",
                        "Giant",
                        "Picket",
                    ]
                },
                {
                    name: "Material",
                    sides: [
                        "Wood",
                        "Plastic",
                        "Paper",
                        "Organic",
                        "Metal",
                        "Edible",
                    ]
                },
                {
                    name: "Device",
                    sides: [
                        "Vehicle",
                        "Art",
                        "Game",
                        "Robot",
                        "Computer",
                        "Tool",
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div className="Home" className="mt-2">
    
                <p>I created this site to test my ability to make a full-stack JavaScript application with a React front-end. It was inspired by Atomic Shrimp's <a href="https://www.youtube.com/watch?v=NBdVpiWUKhU" target="_blank">Invention Dice</a>.</p>
    
                <p>The basic premise is that randomness can be a part of the creative process. By rolling dice with sides grouped into categories you can be prompted with a unique combination. Below is the dice from Atomic Shrimp's video, but you can customize it by going to <Link to="/create">Create Set</Link>. Unlike real dice, my project-dice can have any number of sides, and you can add or remove as many dice as you wish.</p>
    
                <ViewSet set={this.state.invention} />
            </div>
        );
    }

};

/*Home.propTypes = {
    test: PropTypes.string.isRequired,
};*/

export default Home;
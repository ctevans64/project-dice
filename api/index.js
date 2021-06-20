import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';

import config from '../config';

let mdb;
let client;

MongoClient.connect(config.mongodbUri, {useUnifiedTopology: true}, (err, cl) => {
    assert.strictEqual(null, err);
    client = cl;
    mdb = client.db('project-dice');
});

const router = express.Router();

// Save created set to session
router.post('/saveCreate', (req, res) => {
    req.session.create = req.body;
    res.sendStatus(200);
});

// Save published sets to database
router.post('/publishCreate', (req, res) => {
    // Validate that the set is good
    let set = req.body;

    let validSet = true;

    // Set has name
    if(validSet && !("name" in set) && (typeof set.name) !== "string"){
        validSet = false;
    }

    // Set has author
    if(validSet && !("author" in set) && (typeof set.author) !== "string"){
        validSet = false;
    }

    // Set has dice
    if(validSet && !("dice" in set) && Array.isArray(set.dice)){
        validSet = false;
    }

    // Dice are valid
    if(validSet){
        for(const die of set.dice){
            // Die has name
            if(validSet && !("name" in die) && (typeof die.name) !== "string"){
                validSet = false;
                break;
            }

            // Die has sides
            if(validSet && !("sides" in die) && Array.isArray(die.sides)){
                validSet = false;
                break;
            }

            //Valid sides
            if(validSet){
                for(const side of die.sides){
                    if((typeof side) !== "string"){
                        validSet = false;
                        break;
                    }
                }
            }else{
                break;
            }
        }
    }

    if(!validSet){
        res.status(400).send("Invalid set format.");
    }else{
        // Save to database
        mdb.collection("sets").insertOne({ ...set }).then( result => {
            res.send({_id: result.insertedId});
        }).catch( (error) => {
            console.error(error);
            res.status(500).send("Error inserting new set.");
        });
    }
});


router.post('/getSet', (req, res) => {
    if("_id" in req.body){
        mdb.collection("sets").findOne({_id: ObjectID(req.body._id)}).then((result) => {
            res.send(result);
        });
    }else{
        res.send({});
    }
});
router.post('/getSets', (req, res) => {
    if("query" in req.body){
        let query = {};
        if(req.body.query){
            query = {
                $or: [
                    {"name": RegExp(`.*${req.body.query}.*`)},
                    {"dice.name": RegExp(`.*${req.body.query}.*`)},
                    {"dice.sides": RegExp(`.*${req.body.query}.*`)},
                ]            
            }
        }

        mdb.collection("sets").find(query).toArray().then((result) => {
            if(result){
                res.send(result);
            }else{
                res.send([]);
            }
            
        });
    }else{
        res.send([]);
    }
});

export default router;
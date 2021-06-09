import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';

import config from '../config';

let mdb;
let client;

MongoClient.connect(config.mongodbUri, {useUnifiedTopology: true}, (err, cl) => {
    assert.strictEqual(null, err);
    client = cl;
    mdb = client.db('test');
});

const router = express.Router();

// TODO: Add API backend here

export default router;
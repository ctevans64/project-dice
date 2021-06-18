import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

// Allow for server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AppServer from './src/components/AppServer';


import config from './config';
import apiRouter from './api';

var session = require('express-session');
const server = express();

var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: config.mongodbUri,
    collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

// Tell Express to use EJS for template language
server.set('view engine', 'ejs');

// Use standard session handling
server.use(session({
    secret: 'project-dice-secret',
    name: 'project-dice-secret-name',
    cookie: {
        //httpOnly: true,
        //secure: true,
        sameSite: true,
        maxAge: 1 * 60 * 60 * 1000 //Time out session after 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// Request bodies are treated as JSON
server.use(express.json());

// Have express compile sass to css in public folder
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    outputStyle: 'expanded' // Or compressed for production
}));


server.get(['/', '/create', '/browse', '/browse/:id'], (req, res) => {
    //Default set that shows on session create
    if(!req.session.create){
        req.session.create = config.invention
    }
    const initialData = {
        create: req.session.create
    };
    const initialMarkup = ReactDOMServer.renderToString(
        <AppServer url={req.url} create={req.session.create}/>
      );
    res.render('index', {
        initialMarkup,
        initialData
    });
});

//Have express serve static content from the public folder
server.use(express.static('./public'));

//Use local custom router for /api calls
server.use('/api', apiRouter); 

server.listen(config.port, config.host, () => {
    console.info('Express listening on port: ', config.port);
});
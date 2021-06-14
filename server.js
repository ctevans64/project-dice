import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

// Allow for server side rendering
import React from 'react';
import {
    StaticRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import ReactDOMServer from 'react-dom/server';

import Home from './src/components/pages/Home';

import Header from './src/components/Header';


import config from './config';
import apiRouter from './api';
import Create from './src/components/pages/Create';
import Browse from './src/components/pages/Browse';

const server = express();

// Tell Express to use EJS for template language
server.set('view engine', 'ejs');

// Request bodies are treated as JSON
server.use(express.json());

// Have express compile sass to css in public folder
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    outputStyle: 'expanded' // Or compressed for production
}));


server.get(['/', '/create', '/browse', '/browse/:setId'], (req, res) => {
    const initialData = {};
    const initialMarkup = ReactDOMServer.renderToString(
        <Router location={req.url}>
            <div className="App">
                <Header />
                <div id="page-body" className="container">
                    <Switch>
                        <Route path="/" component={Home}  exact />
                        <Route path="/create" component={Create} />
                        <Route path="/browse" component={Browse} />
                    </Switch>
                </div>
            </div>
        </Router>
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
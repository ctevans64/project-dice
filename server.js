import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';

import config from './config';
import apiRouter from './api';

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


server.get(['/', '/contest/:contestID'], (req, res) => {
    const { initialMarkup, initialData } = serverRender();
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
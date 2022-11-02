const express = require('express');
const next = require('next');
const plans = require('./data/available-plans.json');
const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const port = 3000;

    // Endpoints
    server.get('/plans', (req, res) => {
        res.status(200).send(plans);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Server running on http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(err);
    process.exit(1);
})
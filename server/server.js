const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const plans = require('./data/available-plans.json');
const { v4: idGenerator } = require('uuid');
const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json();

app.prepare().then(() => {
    const server = express();
    const port = 3000;

    // Endpoints
    server.get('/plans', (req, res) => {
        res.status(200).send(plans);
    });

    server.post('/signplan', jsonParser, (req, res) => {
        let statusCode = 200;
        try {
            const {cardNum, month, year, cvv, ownerName} = req.body;

            if (!cardNum || !month || !year || !cvv || !ownerName) {
                statusCode = 400;
                throw new Error('Please check your infos, all fields must be filled');
            }

            const id = idGenerator();
            const newPlanSign = {
                id,
                cardNum,
                month,
                year,
                cvv,
                ownerName
            };

            res.status(statusCode).send({message: 'Plan signed successfully', info: newPlanSign});
        } catch (error) {
            if (statusCode === 400) {
                res.status(statusCode).send({message: error.message});
            }
            if (statusCode === 200) {
                statusCode = 500;
                res.status(statusCode).send({message: 'Internal server error, please try again'})
            }
        }
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
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const plans = require('./data/available-plans.json');
const cards = require('./data/available-cards.json');
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

            // Checking if the fields are filled
            if (!cardNum || !month || !year || !cvv || !ownerName) {
                statusCode = 400;
                throw new Error('Please check your infos, all fields must be filled');
            }

            // Checking if the card have 16 digits or 15 case the card is an American Express
            const cardOnlyNums = cardNum.split('').filter((char) => {return char !== " "});

            if (cardOnlyNums.length < 15 || cardOnlyNums.length > 16) {
                statusCode = 400;
                throw new Error('Please check your card number');
            } 

            // Checking if all the digits are numbers
            for (let i = 0; i < cardOnlyNums.length; i++) {
                let num = Number(cardOnlyNums[i]);

                if (String(num) === 'NaN') {
                    statusCode = 400;
                    throw new Error('Please check your card number');
                }
            }

            // Check if the card is registered
            const dbCard = cards.data.cards.filter(card => card.number === cardNum);

            if (!dbCard[0]) {
                statusCode = 401;
                throw new Error("Card isn't registered");
            }

            if (dbCard[0].description === 'Just an expired card.') {
                statusCode = 401;
                throw new Error(dbCard[0].description);
            }

            if (dbCard[0].description === 'A card with no balance available.') {
                statusCode = 401;
                throw new Error(dbCard[0].description);
            }

            // Check the month 
            if (month < 1 || month > 12) {
                statusCode = 400;
                throw new Error('Please check the month number');
            }

            // Check the cvv
            const cvvArr = cvv.split('');

            if (cvvArr.length < 3 || cvvArr.length > 4) {
                statusCode = 400;
                throw new Error('Please check your cvv number');
            }

            for (let i = 0; i < cvvArr.length; i++) {
                let num = Number(cvvArr[i]);

                if (String(num) === 'NaN') {
                    statusCode = 400;
                    throw new Error('Please check your cvv number');
                }
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
            if (statusCode === 200) {
                statusCode = 500;
                res.status(statusCode).send({message: 'Internal server error, please try again'})
            }
            else {
                res.status(statusCode).send({message: error.message});
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
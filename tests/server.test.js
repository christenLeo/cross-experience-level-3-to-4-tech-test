import dataBasePlansInfo from "../server/data/available-plans.json";
import dataBaseCardsInfo from "../server/data/available-cards.json";
import { v4 as idGenerator } from 'uuid';


const getPlansMock = () => {
    return dataBasePlansInfo.data.availablePlans;
};

const postSignPlanMock = (body) => {

    const {cardNum, month, year, cvv, ownerName} = body;

    if (!cardNum || !month || !year || !cvv || !ownerName) {
        return 'Please check your infos, all fields must be filled';
    }

    const cardOnlyNums = cardNum.split('').filter((char) => {return char !== " "});

    if (cardOnlyNums.length < 15 || cardOnlyNums.length > 16) {
        return 'Please check your card number';
    } 

    for (let i = 0; i < cardOnlyNums.length; i++) {
        let num = Number(cardOnlyNums[i]);

        if (String(num) === 'NaN') {
            return 'Please check your card number';
        }
    }

    const dbCard = dataBaseCardsInfo.data.cards.filter(card => card.number === cardNum);

    if (!dbCard[0]) {
        return "Card isn't registered";
    }

    if (dbCard[0].description === 'Just an expired card.') {
        return dbCard[0].description;
    }

    if (dbCard[0].description === 'A card with no balance available.') {
        return dbCard[0].description;
    }

    if (month < 1 || month > 12) {
        return 'Please check the month number';
    }

    const cvvArr = cvv.split('');

    if (cvvArr.length < 3 || cvvArr.length > 4) {
        return 'Please check your cvv number';
    }

    for (let i = 0; i < cvvArr.length; i++) {
        let num = Number(cvvArr[i]);

        if (String(num) === 'NaN') {
            return 'Please check your cvv number';
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

    return {message: 'Plan signed successfully', info: newPlanSign};
};    

describe('GET Plans', () => {
    it ('it return the plans', () => {
        const plans = getPlansMock();

        expect(plans).toBe(dataBasePlansInfo.data.availablePlans);
    });
});

describe('POST Sign Plans', () => {
    it('Happy road, all validations check', () => {
        const body = {
            cardNum: '5452 5389 4527 1089',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const {message} = postSignPlanMock(body);

        expect(message).toBe('Plan signed successfully');
    });
    it('With one or more info missing', () => {
        const body = {
            cardNum: '',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check your infos, all fields must be filled');
    });
    it('With wrong credit card number, numbers missing', () => {
        const body = {
            cardNum: '5452 5389 4527',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check your card number');
    });
    it('With wrong credit card number, with letters in the middle', () => {
        const body = {
            cardNum: '5452 53f9 45t7 1089',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check your card number');
    });
    it('With wrong credit card number, card not registered', () => {
        const body = {
            cardNum: '5452 5349 4517 1035',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe("Card isn't registered");
    });
    it('Trouble at card validation, card without balance', () => {
        const body = {
            cardNum: '4532 4957 4695 2291',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('A card with no balance available.');
    });
    it('Trouble at card validation, card expired', () => {
        const body = {
            cardNum: '5361 9278 2540 8152',
            month: '11',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Just an expired card.');
    });
    it('Other info errors, wrong month number', () => {
        const body = {
            cardNum: '5452 5389 4527 1089',
            month: '25',
            year: '2023',
            cvv: '123',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check the month number');
    });
    it('Other info errors, wrong cvv number', () => {
        const body = {
            cardNum: '5452 5389 4527 1089',
            month: '11',
            year: '2023',
            cvv: '12342',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check your cvv number');
    });
    it('Other info errors, wrong cvv number with letters', () => {
        const body = {
            cardNum: '5452 5389 4527 1089',
            month: '11',
            year: '2023',
            cvv: '1t3',
            ownerName: 'Leona Christen'
        }
        
        const res = postSignPlanMock(body);

        expect(res).toBe('Please check your cvv number');
    });
});
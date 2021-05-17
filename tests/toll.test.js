jest.setTimeout(30000);
const app = require('../src/app');
const request = require('supertest');
const TollReceipt = require('../src/models/tollReceipt');

const receiptOne = {
    vehicleNumber: 'dl_23_asd_4563',
    amount: 100,
    journeyType: 'One Way',
    createdOn: new Date().toLocaleDateString()
}

const receiptTwo = {
    vehicleNumber: 'dl_234563',
    amount: "bhjh",
    journeyType: 'No Way',
    createdOn: new Date().toLocaleDateString()
}

beforeEach(async () => {
    await TollReceipt.deleteMany();
    await new TollReceipt(receiptOne).save();
});

test('Should make a receipt', async () => {
    const receipt = {
        vehicleNumber: 'dl_13_abc_4563',
        amount: 100,
        journeyType: 'Two Way',
        createdOn: new Date().toLocaleDateString()
    }
    const result = await request(app)
        .post('/receipt')
        .send(receipt)
        .expect(201);

    expect(result.body.vehicleNumber).toEqual(receipt.vehicleNumber);
});

test('Should get a receipt', async () => {
    const result = await request(app)
        .get(`/receipt/${receiptOne.vehicleNumber}`)
        .send()
        .expect(200);

    expect(result.body.vehicleNumber).toEqual(receiptOne.vehicleNumber);
    expect(result.body.createdOn).toEqual(new Date().toLocaleDateString());
});

test('Should not accept invalid data', async () => {
    const result = await request(app)
        .post('/receipt')
        .send(receiptTwo)
        .expect(400);

    expect(result.body.length).toEqual(3);
});

test('Should discard invalid query', async () => {
    const result = await request(app)
        .get(`/receipt/${receiptTwo.vehicleNumber}`)
        .send()
        .expect(400);
});
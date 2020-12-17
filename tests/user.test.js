const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Users tests', () => {

    beforeAll(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /* Get all users */
    test('Should get all users', async () => {
        await request(app).get('/users/getusers').send().expect(200);
    });

    /* Create user */
    test('Should create a user', async () => {
        await request(app).post('/users/createUsers').send({
            "id": 0,
            "name": "Test user",
            "email": "testuser@gmail.com",
            "birthDate": "2020-12-17T00:00:00.000Z",
            "address": {
                "id": 0,
                "street": "Calle test",
                "state": "Madrid",
                "city": "Getafe",
                "country": "Spain",
                "zip": "28902"
            }
        }).expect(201);
    });

    test('Should not create a user with invalid usaer data', async () => {
        await request(app).post('/users/createUsers').send({
            "id": "un id",
            "name": "Test user",
            "birthDate": "2020-12-17T00:00:00.000Z",
            "address": {
                "id": 0,
                "street": "Calle test",
                "state": "Madrid",
                "city": "Getafe",
                "country": "Spain",
                "zip": "28902"
            }
        }).expect(405);
    });

    /* Get one user */
    test('Should get a user by id', async () => {
        await request(app).get('/users/getusersById/0').send().expect(200);
    });

    test('Should respond correctly if no user found', async () => {
        await request(app).get('/users/getusersById/999').send().expect(404);
    });

    test('Should respond correctly if no correct user id provided', async () => {
        await request(app).get('/users/getusersById/unId').send().expect(400);
    });

    /* Update one user */
    test('Should update a user', async () => {
        await request(app).put('/users/updateUsersById/0').send({
            "id": 0,
            "name": "Test user updated",
            "email": "testuserupdated@gmail.com",
            "birthDate": "2020-12-17T00:00:00.000Z",
            "address": {
                "id": 0,
                "street": "Calle test updated",
                "state": "Madrid",
                "city": "Getafe",
                "country": "Spain",
                "zip": "28902"
            }
        }).expect(200);
    });

    test('Should respond correctly if no user found', async () => {
        await request(app).put('/users/updateUsersById/99').send({
            "id": 0,
            "name": "Test user updated",
            "email": "testuserupdated@gmail.com",
            "birthDate": "2020-12-17T00:00:00.000Z",
            "address": {
                "id": 0,
                "street": "Calle test updated",
                "state": "Madrid",
                "city": "Getafe",
                "country": "Spain",
                "zip": "28902"
            }
        }).expect(404);
    });
    test('Should respond correctly if no correct user id provided', async () => {
        await request(app).put('/users/updateUsersById/unId').send({
            "id": 0,
            "name": "Test user updated",
            "email": "testuserupdated@gmail.com",
            "birthDate": "2020-12-17T00:00:00.000Z",
            "address": {
                "id": 0,
                "street": "Calle test updated",
                "state": "Madrid",
                "city": "Getafe",
                "country": "Spain",
                "zip": "28902"
            }
        }).expect(400);
    });

    /* Delete one user */
    test('Should delete a user by id', async () => {
        await request(app).delete('/users/deleteUsersById/0').send().expect(200);
    });

    test('Should respond correctly if no user found', async () => {
        await request(app).delete('/users/deleteUsersById/999').send().expect(404);
    });

    test('Should respond correctly if no correct user id provided', async () => {
        await request(app).delete('/users/deleteUsersById/otroId').send().expect(400);
    });

})
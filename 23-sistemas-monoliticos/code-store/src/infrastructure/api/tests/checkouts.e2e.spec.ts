import { app, sequelize } from '../express'
import request from 'supertest'


describe('E2E test for checkout', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        sequelize.connectionManager.initPools();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a checkout', async () => {
        const client = await request(app)
            .post('/clients')
            .send({
                "name": "jose",
                "email": "email@email",
                "document": "123",
                "address": {
                    "street": "street",
                    "number": "123",
                    "city": "city",
                    "zipCode": "zipCode",
                    "state": "state",
                    "complement": "complement"
                }
            });
        const product = await request(app)
            .post('/products')
            .send({
                "name": "product",
                "description": "description",
                "purchasePrice": 100,
                "stock": 10
            });
        const response = await request(app)
            .post('/checkout')
            .send({
                "clientId": client.body.id,
                "products": [
                    {
                        "productId": product.body.id
                    }
                ]
            });
      
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined
        expect(response.body.invoiceId).toBeDefined
        expect(response.body.status).toBe('approved')
    }, 50000)

});
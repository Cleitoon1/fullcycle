import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for invoice', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        sequelize.connectionManager.initPools();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should find an invoice', async () => {
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
        
        const checkout = await request(app)
            .post('/checkout')
            .send({
                "clientId": client.body.id,
                "products": [
                    {
                        "productId": product.body.id
                    }
                ]
            });
        const response = await request(app)
            .get(`/invoices/${checkout.body.invoiceId}`)
            .send();

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('jose')
        expect(response.body.items.length).toBe(1)
        expect(response.body.total).toBe(100)
    }, 50000);

});
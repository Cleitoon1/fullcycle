import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/gateway/checkout.facade.factory";

export const checkoutRoutes = express.Router();

const checkoutFacadeFactory = CheckoutFacadeFactory.create();
checkoutRoutes.post("/", async (req: Request, res: Response) => {
    try {
      const checkoutDto = {
          clientId: req.body.clientId, 
          products: req.body.products.map((p: { productId: any; }) => { return { productId: p.productId }})
      };
  
      const output = await checkoutFacadeFactory.execute(checkoutDto);
  
      res.send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  checkoutRoutes.get("/", async (req: Request, res: Response) => {
    res.format({
      json: async () => res.send(),
    });
  });
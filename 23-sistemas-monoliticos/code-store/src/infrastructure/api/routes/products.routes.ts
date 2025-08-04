import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productsRoutes = express.Router();

const productAdmFacade = ProductAdmFacadeFactory.create();

productsRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const addProductDto = {
          name: req.body.name,
          description: req.body.description,
          purchasePrice: req.body.purchasePrice,
          stock: req.body.stock,
        };
        const output = await productAdmFacade.addProduct(addProductDto);
        res.send(output);
    } catch (err) {
    res.status(500).send(err);
    }
});

productsRoutes.get("/:productId", async (req: Request, res: Response) => {
    const output = await productAdmFacade.checkStock({productId:  req.params.productId});
  
    res.format({
      json: async () => res.send(output),
    });
  });
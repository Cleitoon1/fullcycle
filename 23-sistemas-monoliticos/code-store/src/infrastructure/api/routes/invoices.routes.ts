import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const invoicesRoutes = express.Router();

const invoiceFacadeFactory = InvoiceFacadeFactory.create();

invoicesRoutes.post("/", async (req: Request, res: Response) => {
    try {
      const invoiceDto = {
        name: req.body.name,
        document: req.body.document,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        items: req.body.items.map( (item: any) => { return { id: item.id, name: item.name, price: item.price} })
    };
      const output = await invoiceFacadeFactory.generate(invoiceDto);
      res.send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
invoicesRoutes.get("/:invoiceId", async (req: Request, res: Response) => {
    const output = await invoiceFacadeFactory.find({id: req.params.invoiceId});
  
    res.format({
      json: async () => res.send(output)
    });
  });
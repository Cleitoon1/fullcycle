import express, { Request, Response } from "express";
import Address from "../../../modules/@shared/domain/value-object/address.value-object";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoutes = express.Router();

const clientAdmFacadeFactory = ClientAdmFacadeFactory.create();

clientsRoutes.post("/", async (req: Request, res: Response) => {
    try {
      const clientDto = {
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        address: new Address({
          street: req.body.address.street,
          number: req.body.address.number,
          city: req.body.address.city,
          zipCode: req.body.address.zipCode,
          state: req.body.address.state,
          complement: req.body.address.complement
        })
        };
      const output = await clientAdmFacadeFactory.add(clientDto);
      res.send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  clientsRoutes.get("/:id", async (req: Request, res: Response) => {
    const output = await clientAdmFacadeFactory.find({id: req.params.id});
    res.format({
      json: async () => res.send(output),
    });
  });

import { ClientFlat } from '@/interfaces/client_flat.interface';
import { ClientFlatService } from '@/services/client_flat.service';
import { NextFunction, Request, Response } from 'express';

export class ClientFlatController {
  public clientFlatService = new ClientFlatService();

  public createClientFlat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientFlatData: ClientFlat = req.body;
      const createClientFlatData: ClientFlat = await this.clientFlatService.createClientFlat(clientFlatData);
      res.status(201).json({ data: createClientFlatData, message: 'Client flat created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllClientFlats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientFlatsData: ClientFlat[] = await this.clientFlatService.findAllClientFlats();
      res.status(200).json({ data: clientFlatsData, message: 'Client flats found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientFlatsByClientId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.params.id;
      const clientFlatsData: ClientFlat[] = await this.clientFlatService.findClientFlatsByClientId(clientId);
      res.status(200).json({ data: clientFlatsData, message: 'Client flats found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientFlatsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const clientFlatsData: ClientFlat = await this.clientFlatService.findClientFlatsById(id);
      res.status(200).json({ data: clientFlatsData, message: 'Client flat found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateClientFlat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const clientFlatData: ClientFlat = req.body;
      const updateClientFlatData: ClientFlat = await this.clientFlatService.updateClientFlat(id, clientFlatData);
      res.status(200).json({ data: updateClientFlatData, message: 'Client flat updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClientFlat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const deleteClientFlatData = await this.clientFlatService.deleteClientFlat(id);
      res.status(200).json({ data: deleteClientFlatData, message: 'Client flat deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

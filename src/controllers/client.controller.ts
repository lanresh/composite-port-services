import { uploadToS3 } from '@/helpers/s3.helper';
import { Client } from '@/interfaces/client.interface';
import { ClientService } from '@/services/client.service';
import { NextFunction, Request, Response } from 'express';
import { MulterRequest } from '@/interfaces/multer.interface';

export class ClientController {
  public clientService = new ClientService();

  public findAllClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientsData: Client[] = await this.clientService.findAllClients();
      res.status(200).json({ data: clientsData, message: 'clients found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.params.id;
      const clientData: Client = await this.clientService.findClientById(clientId);

      res.status(200).json({ data: clientData, message: 'client found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientData: Client = req.body;
      const createClientData: Client = await this.clientService.createClient(clientData);
      res.status(200).json({ data: createClientData, message: 'client created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Number(req.params.id);
      const clientData: Client = req.body;
      const updateClientData: Client = await this.clientService.updateClient(clientId, clientData);
      res.status(200).json({ data: updateClientData, message: 'client updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Number(req.params.id);
      const deleteClientData = await this.clientService.deleteClient(clientId);
      res.status(200).json({ data: deleteClientData, message: 'client deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public uploadClientImage = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.userid;
      const { projectId, projectCode } = req.body;
      const files = req.files;
      const imageUrls = await uploadToS3(+projectId, files);

      let result = [];
      for (const image of imageUrls) {
        const uploadImage = await this.clientService.uploadClientImage(clientId, image, projectId, projectCode);
        result.push(uploadImage);
      }

      res.status(200).json({ data: result, message: 'client images uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllClientImagesByProjectId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.id;
      const clientImages = await this.clientService.findClientImagesByProjectId(projectId);
      res.status(200).json({ data: clientImages, message: 'client images found successfully' });
    } catch (error) {
      next(error);
    }
  };
}

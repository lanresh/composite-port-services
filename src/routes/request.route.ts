import { RequestController } from '@/controllers/request.controller';
import { CreateRequestDto } from '@/dtos/request.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class RequestRoute implements Routes {
    public path = '/requests';
    public router = Router();
    public request = new RequestController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateRequestDto), this.request.createRequest);
        this.router.get(`${this.path}`, AuthMiddleware, this.request.getAllRequests);
        this.router.get(`${this.path}/:id`, AuthMiddleware, this.request.getRequest);
        this.router.get(`${this.path}/user/:id`, AuthMiddleware, this.request.getAllUserRequests);
        this.router.put(`${this.path}/:id`, AuthMiddleware, this.request.updateRequest);
        this.router.delete(`${this.path}/:id`, AuthMiddleware, this.request.deleteRequest);
    }

}
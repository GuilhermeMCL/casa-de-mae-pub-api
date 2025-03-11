import { FastifyInstance } from 'fastify';
import { MesaController } from '../controllers/mesaController';

const mesaController = new MesaController();

export function routes(app: FastifyInstance) {
    app.get("/mesas", mesaController.getMesas)
    app.get("/mesas/:id", mesaController.getMesaById)
    app.patch("/mesas/:id/ocupar", mesaController.ocuparMesa)

}
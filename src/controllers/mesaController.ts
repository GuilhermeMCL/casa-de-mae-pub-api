
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";


export class MesaController {
    async getMesas(request: FastifyRequest, reply: FastifyReply) {
        return await prisma.mesa.findMany()
    }

    async getMesaById(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string()
        })
        const { id } = paramsSchema.parse(request.params)

        return await prisma.mesa.findUnique({
            where: {
                id
            }
        })
    }

    async createMesa(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            numero: z.number(),
        })

        const { numero } = bodySchema.parse(request.body)

        const mesaexistente = await prisma.mesa.findUnique({
            where: {
                numero
            }
        })

        if (mesaexistente) {
            return reply.status(400).send({
                message: 'Mesa já cadastrada'
            })
        }

        const mesa = await prisma.mesa.create({
            data: {
                numero
            }
        })
        return reply.status(201).send(mesa)
    }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { send } from "process";


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

    async ocuparMesa(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            ocupada: z.boolean()
        })

        const { id } = paramsSchema.parse(request.params)
        const { ocupada } = bodySchema.parse(request.body)

        const mesa = await prisma.mesa.update({
            where: { id },
            data: {
                ocupada
            }
        })

        return reply.status(200).send(mesa)

    }


    async deletemesa(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string()
        })
        const { id } = paramsSchema.parse(request.params)
        await prisma.mesa.delete({
            where: {
                id
            }
        })
        return reply.status(204).send({ message: "mesa deletada" })
    }
}
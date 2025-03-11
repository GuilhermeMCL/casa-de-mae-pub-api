import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify from "fastify";

export const app = fastify()

app.register(cors)
app.register(jwt, {
    secret: process.env.JWT_SECRET || 'secret',
})

app.get('/', () => 'Hello World')
import Fastify from "fastify"
import fastifyBasicAuth from "@fastify/basic-auth"
import {readFileSync} from 'node:fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = 3000;
const authenticate = {realm: 'Westeros'}

const __dirname = dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({
    https: {
        key: readFileSync(path.join(__dirname, '..', 'https', 'server.key')),
        cert: readFileSync(path.join(__dirname, '..', 'https', 'cert.crt'))
    },
    logger: true
})

fastify.register(fastifyBasicAuth, {
    validate,
    authenticate
})

async function validate(username, password, req, reply) {
    if (username !== 'Tyrion' || password !== 'wine') {
        return new Error('Winter is coming')
    }
}

fastify.get('/dmz', {}, (req, res) => {
    res.send({replique: "Ca pourrait être mieux protégé..."})
})

fastify.after(() => {
    fastify.route({
        method: 'GET',
        url: '/secu',
        onRequest: fastify.basicAuth,
        handler: async (req, reply) => {
            return {
                replique: 'Un Lannister paye toujours ses dettes !'
            }
        }
    })
})

fastify.after(() => {
    fastify.route({
        method: 'GET',
        url: '/autre',
        handler: async (req, reply) => {
            return {
                replique: 'Un Lannister ne paye jamais ses dettes :/'
            }
        }
    })
})

fastify.setErrorHandler(function (err, req, reply) {

    if (err.statusCode === 401) {
        console.log(err)
        reply.code(401).send({replique: 'Tu ne sais rien, John Snow..'})
    }
    reply.send(err)
})

fastify.listen({port}, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.log.info(`Fastify is listening on port: ${address}`);
});

import fp from 'fastify-plugin'
import path from 'path';
import fastifyJwt from "@fastify/jwt";
import fs from 'fs';

export default fp(async function (app, opts) {

    const privateKey = fs.readFileSync(path.join(__dirname, '../../.ssl/ecdsa-private.pem'), 'utf8');

    app.register(fastifyJwt, {
        secret: privateKey,
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
    })

})
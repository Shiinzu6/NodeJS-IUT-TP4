import fastify from "fastify"
import fastifyFormbody from "@fastify/formbody"

export const build = (opts = {}) => {
    const app = fastify(opts)

    app.register(import("./plugins/jwt.js"))
    app.register(fastifyFormbody)
    app.register(import("./routes/routes.js"))

    return app
}

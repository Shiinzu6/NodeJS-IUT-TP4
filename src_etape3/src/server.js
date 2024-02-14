const {build} = await import( "./app.js")

const app = build({logger: false})

const start = async () => {
    try {
        await app.listen({port: 3000})
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
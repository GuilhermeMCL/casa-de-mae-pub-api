import { app } from './app'
import { env } from './env'


try {
    app
        .listen({
            host: '0.0.0.0',
            port: env.PORT,
        })
        .then(() => {
            console.log('🚀 Server is running on http://localhost:', env.PORT)
        })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}




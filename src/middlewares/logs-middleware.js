import fs from 'fs'
import morgan from 'morgan'

const date = new Date()
const logFile = `./log${date.getMonth()}${date.getDate()}-log`

const applicationLogger = (app) => {
    app.use(morgan('common', {
        stream: fs.createWriteStream(logFile, { flags: 'a' })
    }));
    app.use(morgan('tiny'))
}

const webhooksLogger = (req, res, next) => {
    const { event } = req.body
    const objectEvent = event.split('.')[0]

    switch (objectEvent) {
        case "order":
            break;
        case "order":
            break;
        default:
            fs.createWriteStream(logFile, { flags: 'a' })
            console.log()
    }

    next()
}

const LoggerMiddleware = {
    applicationLogger,
    webhooksLogger
}


export { LoggerMiddleware }
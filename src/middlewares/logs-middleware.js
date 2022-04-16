import fs from 'fs'
import morgan from 'morgan'

const date = new Date()
const logFile = `./log-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}.log`

const applicationLogger = (app) => {
    morgan.token('custom-errors', (req, res) => (res.statusCode > 300 ? `\"Error\"` : ''))
    app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :custom-errors', {
        stream: fs.createWriteStream(logFile, { flags: 'a' }),
    }))
    app.use(morgan('tiny'))
}

const webhooksLogger = (req, res, next) => {
    const { event } = req.body
    const objectEvent = event?.split('.')[0]

    switch (objectEvent) {
        case "order":
            const { order } = req.body
            writeLog(`${event} on ${order.order_number}`)
        case "product":
            () => { }
        default:
            writeLog("\"No indetify webhook was called!\" ", false)
    }

    next()
}

const writeLog = (message, consoleStream = true) => {
    fs.appendFileSync(logFile, message)
    if (consoleStream === true) {
        console.log(message)
    }
}

const LoggerMiddleware = {
    applicationLogger,
    webhooksLogger
}


export { LoggerMiddleware }
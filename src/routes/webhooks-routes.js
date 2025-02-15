import express from "express"
import { LoggerMiddleware } from "../middlewares"
import { WebhooksService } from "../services"

const router = express.Router()

router.use((req, res, next) => LoggerMiddleware.webhooksLogger(req, res, next))

router.post('/order-created', async (req, res) => {
    const webhookOrder = req.body
    await WebhooksService.saveOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-paid', async (req, res) => {
    const webhookOrder = req.body
    await WebhooksService.updateOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-updated', async (req, res) => {
    const webhookOrder = req.body
    await WebhooksService.updateOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-refunded', async (req, res) => {
    const webhookOrder = req.body
    await WebhooksService.updateOrder(webhookOrder)
    res.send('ok')
})

router.post('/product-created', async (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send('ok')
})

router.post('/product-updated', async (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send('ok')
})

router.post('/product-deleted', async (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send('ok')
})

const webhooksRoutes = (app) => {
    app.use('/webhooks', router)
}

export { webhooksRoutes }
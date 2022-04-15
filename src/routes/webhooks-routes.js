import express from "express"
import { WebhooksService } from "../services"

const router = express.Router()

router.post('/order-created', async (req, res) => {
    const webhookOrder = JSON.parse(req.body)
    await WebhooksService.saveOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-paid', async (req, res) => {
    const webhookOrder = JSON.parse(req.body)
    await WebhooksService.saveOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-updated', async (req, res) => {
    const webhookOrder = JSON.parse(req.body)
    await WebhooksService.saveOrder(webhookOrder)
    res.send('ok')
})

router.post('/order-refunded', async (req, res) => {
    const webhookOrder = JSON.parse(req.body)
    await WebhooksService.saveOrder(webhookOrder)
    res.send('ok')
})

const webhooksRoutes = (app) => {
    app.use('/webhooks', router)
}

export { webhooksRoutes }
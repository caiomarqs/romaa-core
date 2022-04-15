import express from "express"

const router = express.Router()

router.post('/order-created', async (req, res) => {
    console.log(req.body.toString())
    res.send('ok')
})

router.post('/order-paid', async (req, res) => {
    console.log(req.body.toString())
    res.send('ok')
})

router.post('/order-updated', async (req, res) => {
    console.log(req.body.toString())
    res.send('ok')
})

router.post('/order-refunded', async (req, res) => {
    console.log(req.body.toString())
    res.send('ok')
})

const webhooksRoutes = (app) => {
    app.use('/webhooks', router)
}

export { webhooksRoutes }
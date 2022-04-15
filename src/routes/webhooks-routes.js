import express from "express"

const router = express.Router()

router.get('/order-created', async (req, res) => {
    console.log('req:', req)
    res.send('ok')
})

const webhooksRoutes = (app) => {
    app.use('/webhooks', router)
}

export { webhooksRoutes }
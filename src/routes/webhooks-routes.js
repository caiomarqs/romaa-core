import express from "express"

const router = express.Router()

router.get('/order-created', async (req, res) => {
    console.log('req:', req)
})

const webhooksRoutes = (app) => {
    app.use('/webhooks', router)
}

export { webhooksRoutes }
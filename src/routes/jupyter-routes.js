import express from "express"
import { AuthMiddleware } from "../middlewares"
import { JupyterService } from "../services"

const router = express.Router()

router.use((req, res, next) => AuthMiddleware.verifyToken(req, res, next))

router.get('/', (req, res) => {
    res.send("jupyter")
})

router.get('/orders', async (req, res) => {
    const data = await JupyterService.getAllOrders()
    res.send(data)
})

router.get('/orders-no-clients', async (req, res) => {
    const data = await JupyterService.getAllOrdersNoClients()
    res.send(data)
})

const jupyterRoutes = (app) => {
    app.use('/jupyter', router)
}

export { jupyterRoutes }
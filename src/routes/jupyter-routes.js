import express from "express"
import { JupyterService } from "../services"

const router = express.Router()

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
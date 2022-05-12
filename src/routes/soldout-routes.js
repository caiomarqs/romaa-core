import express from "express"
import { SoldoutStockCollection } from "../data"
import { SoldoutService } from "../services"

const router = express.Router()

router.post('/order', async (req, res) => {
    await SoldoutService.postOrder(req.body)
    return res.status(200).send()
})

router.get('/stock', async (_, res) => {
    const stock = await SoldoutStockCollection.getStock()
    return res.send(stock)
})

const soldoutRoutes = (app) => {
    app.use('/sold-out', router)
}

export { soldoutRoutes }
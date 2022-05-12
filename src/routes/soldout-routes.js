import express from "express"
import { SoldoutStockCollection } from "../data"
import { AuthMiddleware } from "../middlewares"
import { LoginService } from "../services"

const router = express.Router()

router.post('/order', async (req, res) => {
    const { 
        name,
        cpf,
        products,
        price
    } = req.body


    const insertOrder = await LoginService.getUser(name, password)

    if (!user) {
        return res.status(404).send({ message: "User not found!" })
    }

    return res.status(200).send({ 
        user: name, 
        token: AuthMiddleware.genarateToken(user) 
    })
})

router.get('/stock', async (_, res) => {
    const stock = await SoldoutStockCollection.getStock()
    console.log(stock)
    return res.send(stock)
})

const soldoutRoutes = (app) => {
    app.use('/sold-out', router)
}

export { soldoutRoutes }
import express from "express"
import { AuthMiddleware } from "../middlewares"
import { LoginService } from "../services"

const router = express.Router()

router.post('/', async (req, res) => {
    const { name, password } = req.body
    const user = await LoginService.getUser(name, password)

    if (!user) {
        return res.status(404).send({ message: "User not found!" })
    }

    return res.status(200).send({ 
        user: name, 
        token: AuthMiddleware.genarateToken(user) 
    })
})

const loginRoutes = (app) => {
    app.use('/login', router)
}

export { loginRoutes }
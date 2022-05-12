import express from "express";
import { runMongo } from "./data";
import { dontSleep } from "./dont-sleep";
import { LoggerMiddleware } from "./middlewares";
import { jupyterRoutes, loginRoutes, webhooksRoutes } from "./routes";
import { soldoutRoutes } from "./routes/soldout-routes";
import path from 'path'

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Romã core ON")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const startup = () => {
    runMongo().then(() => {
        dontSleep()

        LoggerMiddleware.applicationLogger(app)
        
        soldoutRoutes(app)
        jupyterRoutes(app)
        webhooksRoutes(app)
        loginRoutes(app)

        console.log(`Starting server on ${port}`)
    }).catch(error => {
        console.log(error)
    })
}



app.listen(port, startup)

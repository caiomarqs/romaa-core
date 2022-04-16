import express from "express";
import { runMongo } from "./data";
import { dontSleep } from "./dont-sleep";
import { jupyterRoutes, loginRoutes, webhooksRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Romã core ON")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const startup = () => {
    runMongo().then(() => {
        dontSleep()

        jupyterRoutes(app)
        webhooksRoutes(app)
        loginRoutes(app)

        console.log(`Starting server on ${port}`)
    }).catch(error => {
        console.log(error)
    })
}

app.listen(port, startup)

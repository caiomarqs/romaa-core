import express from "express";
import { runMongo } from "./data";
import { jupyterRoutes, webhooksRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Romã core ON")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const startup = () => {
    runMongo().then(() => {


        jupyterRoutes(app)
        webhooksRoutes(app)
        console.log('Starting server on 3000')
    }).catch(error => {
        console.log(error)
    })
}

app.listen(port, startup)

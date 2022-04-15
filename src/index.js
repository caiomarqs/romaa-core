import express from "express";
import { runMongo } from "./data";
import { jupyterRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3000 

app.get('/', (req, res) => {
    res.send("Romã core ON")
})

const startup = () => {
    runMongo().then(() => {
        jupyterRoutes(app)
        console.log('Starting server on 3000')
    }).catch(error => {
        console.log(error)
    })
}

app.listen(port, startup)

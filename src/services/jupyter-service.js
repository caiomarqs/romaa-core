import { OrdersCollection } from "../data"
import { OrdersWithNoClient } from "../models/Responses"

const getAllOrders = async () => {
    const orders = await OrdersCollection.getAllOrders()
    const models = orders.map(order =>  new OrdersJupyter(order))
    return models
}

const getAllOrdersNoClients = async () => {
    const orders = await OrdersCollection.getAllOrders()
    const models = orders.map(order =>  new OrdersWithNoClient(order))
    return models
}

const JupyterService = {
    getAllOrders,
    getAllOrdersNoClients
}

export { JupyterService }
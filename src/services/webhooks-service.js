import { OrdersCollection } from "../data"
import { WebhookOrderEventRequest } from "../models/Requests"

const saveOrder = async (order) => {
    const orderToSave = new WebhookOrderEventRequest(order).mapToOrder()
    return OrdersCollection.saveOrder(orderToSave)
}

const WebhooksService = {
    saveOrder
}

export { WebhooksService }
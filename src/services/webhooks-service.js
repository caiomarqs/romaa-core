import { OrdersCollection } from "../data"
import { WebhookOrderEventRequest } from "../models/Requests"

const saveOrder = async (order) => {
    const orderToSave = new WebhookOrderEventRequest(order).mapToOrder()
    return OrdersCollection.saveOrder(orderToSave)
}

const updateOrder = async (order) => {
    const orderToUpdate = new WebhookOrderEventRequest(order).mapToOrder()
    return OrdersCollection.updateOrderByOrderNumber(orderToUpdate)
}

const WebhooksService = {
    saveOrder,
    updateOrder
}

export { WebhooksService }
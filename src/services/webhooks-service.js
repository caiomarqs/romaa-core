import { OrdersCollection } from "../data"
import { WebhookOrderEventRequest } from "../models/Requests"

const saveOrder = async (order) => {
    const orderToSave = new WebhookOrderEventRequest(order).mapToOrder()
    return await OrdersCollection.saveOrder(orderToSave)
}

const updateOrder = async (order) => {
    const orderToUpdate = new WebhookOrderEventRequest(order).mapToOrder()
    return await OrdersCollection.updateOrderByOrderNumber(orderToUpdate)
}

const WebhooksService = {
    saveOrder,
    updateOrder
}

export { WebhooksService }
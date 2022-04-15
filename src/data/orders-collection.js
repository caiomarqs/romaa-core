let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const getAllOrders = async () => {
    return await localCollection.find({}).toArray()
}

const saveOrder = async (order) => {
    return await localCollection.insertOne(order)
}

const updateOrderByOrderNumber = async (order) => {
    return await localCollection.updateOne({ orderNumber: order.orderNumber }, order)
}

const OrdersCollection = {
    init,
    getAllOrders,
    saveOrder,
    updateOrderByOrderNumber
}

export { OrdersCollection }
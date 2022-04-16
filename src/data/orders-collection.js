let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const getAllOrders = async () => {
    return await localCollection.find({}).toArray()
}

const getOrderByOrderNumber = async (orderNumber) => {
    return await localCollection.find({ orderNumber }).toArray()[0]
}

const saveOrder = async (order) => {
    const existsOrder = await getOrderByOrderNumber(order.orderNumber);

    if (existsOrder) {
        return null;
    }
    
    return await localCollection.insertOne(order)
}

const updateOrderByOrderNumber = async (order) => {
    return await localCollection.updateOne(
        { orderNumber: order.orderNumber },
        { $set: order },
        { upsert: true }
    )
}

const OrdersCollection = {
    init,
    getAllOrders,
    saveOrder,
    updateOrderByOrderNumber
}

export { OrdersCollection }
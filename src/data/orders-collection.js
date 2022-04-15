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
    return await localCollection.save(order)
}

const OrdersCollection = {
    init,
    getAllOrders,
    saveOrder
}

export { OrdersCollection }
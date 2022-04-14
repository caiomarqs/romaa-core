let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const getAllOrders = async () => {
    return await localCollection.find({}).toArray()
}

const OrdersCollection = {
    init,
    getAllOrders
}

export { OrdersCollection }
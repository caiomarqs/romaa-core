let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const saveOrder = async (order) => {
    return await localCollection.insertOne(order)
}

const SoldoutOrderCollection = {
    init,
    saveOrder
}

export { SoldoutOrderCollection }
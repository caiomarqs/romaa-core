let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const getStock = async () => {
    return await localCollection.find({}).toArray()
}

const saveStock = async () => {}

const SoldoutStockCollection = {
    init,
    getStock,
    saveStock
}

export { SoldoutStockCollection }
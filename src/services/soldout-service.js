import { SoldoutOrderCollection, SoldoutStockCollection } from "../data"

const postOrder = async (order) => {
    await SoldoutOrderCollection.saveOrder(order)
    
    const stock = await SoldoutStockCollection.getStock()

    await SoldoutStockCollection.saveStock(stock)
}

const getStock = async () => {
    return await SoldoutStockCollection.getStock()
}

const SoldoutService = {
    postOrder,
    getStock
}

export { SoldoutService }
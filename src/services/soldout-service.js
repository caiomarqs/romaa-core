import { SoldoutOrderCollection, SoldoutStockCollection } from "../data"
import { SoldoutOrderRequest } from "../models/Requests"

const postOrder = async (body) => {
    const order = new SoldoutOrderRequest(body)
    await SoldoutOrderCollection.saveOrder(order)
    let stock = await SoldoutStockCollection.getStock()

    order.products.forEach(product => {
        console.log(product)
        const indexToUpdate = stock.findIndex(stockElement => (
            stockElement.model === product.model
            && stockElement.size === product.size
            && stockElement.color === product.color
        ))

        const qntdStock = stock[indexToUpdate].qntd
        const qntdToSub = product.qntd

        const qntdFinal = qntdStock - qntdToSub

        stock[indexToUpdate].qntd = qntdFinal
    })

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
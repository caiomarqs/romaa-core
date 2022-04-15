class OrdersWithNoClient {
    constructor(order){
        this.date = order.date
        this.orderNumber = order.order_number
        this.skus = order.products ? order.products.map(product => product.SKU) : []
    }
}

export { OrdersWithNoClient }
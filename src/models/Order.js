class Order {
    constructor(order) {
        if (order) {
            this.id = order.id
            this.date = order.date
            this.updatedAt = order.updatedAt ? order.updatedAt : order.date
            this.orderNumber = Number.parseInt(order.orderNumber)
            this.lineItemNumber = order.lineItemNumber
            this.email = order.email
            this.contactPerson = order.contactPerson
            this.address = order.address
            this.address2 = order.address2
            this.zipCode = order.zipCode
            this.city = order.city
            this.province = order.province
            this.country = order.country
            this.cpf = order.cpf ?? ""
            this.cnpj = order.cnpj ?? ""
            this.fullName = order.fullName
            this.mobileNo = order.mobileNo
            this.orderMemo = order.orderMemo
            this.orderCustomNotes = order.orderCustomNotes
            this.shippingMethod = order.shippingMethod
            this.totalCostOfOrder = Number.parseFloat(order.totalCostOfOrder)
            this.productsTotal = Number.parseFloat(order.productsTotal)
            this.shippingCost = order.shippingCost
            this.aliExpressOrderNumber = order.aliExpressOrderNumber
            this.trackingNo = order.trackingNo
            this.status = order.status
            this.reembolsado = order.reembolsado
            this.pagoPeloCliente =  Number.parseFloat(order.pagoPeloCliente)
            this.recebivelCartPandaPayments = order.recebivelCartPandaPayments
            this.authCode = order.authCode
            this.nsu = order.nsu
            this.paymentStatus = order.paymentStatus
            this.paymentMethod = order.paymentMethod
            this.fulfillmentStatus = order.fulfillmentStatus
            this.trackingCode = order.trackingCode
            this.products = order.products
            this.paymentGateway = order.paymentGateway
        }
    }
}

export { Order }
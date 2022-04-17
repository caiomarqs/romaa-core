import { Order } from '../Order'

class OrdersJupyter extends Order {
    /**
     * 
     * @param {Order} order 
     */
    constructor(order) {
        const [getway, company, service, days] = order.shippingMethod.split('-')

        super(order)
        this.shippingGetway = getway.trim()
        this.shippingCompany = company.trim()
        this.shippingService = service.trim()
        this.shippingDays = Number.parseInt(days.trim().replace(/\D/g, ""))
    }
}

export { OrdersJupyter }
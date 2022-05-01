import { Order } from '../Order'
import { ProductJupyter } from './ProductJupyter'

class OrdersJupyter extends Order {

    /**
     * 
     * @param {Order} order 
     */
    constructor(order) {
        const [getway, company, service, days] = order.shippingMethod.split('-')
        console.log(order.totalCostOfOrder)
        console.log(order.shippingCost)
        super(order)
        this.shippingGetway = getway.trim()
        this.shippingCompany = company.trim()
        this.shippingService = service.trim()
        this.shippingDays = Number.parseInt(days.trim().replace(/\D/g, ""))
        this.productsCost = Number.parseFloat((order.totalCostOfOrder - order.shippingCost).toFixed(2))
        this.products = this.products.map(product => (
            new ProductJupyter(order.orderNumber, product)
        ))
    }

    translatePaymentMethodsValues() {
        if (this.paymentMethod === '') {
            this.paymentMethod = 'pix'
        }
        if (this.paymentMethod === 'cc') {
            this.paymentMethod = 'Credit Card'
        }

        return this
    }

    getPrincipalElements(...args) {
        const obj = {}

        args.forEach(argument => {
            obj[argument] = this[argument]
        })

        return obj
    }
}

export { OrdersJupyter }
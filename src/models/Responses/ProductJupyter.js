import { Product } from "../Products"

class ProductJupyter extends Product {
    constructor(orderNumber, product) {
        super(product)
        this.orderNumber = orderNumber
    }
}

export { ProductJupyter }
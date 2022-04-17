class Product {
    constructor(product) {
        this.sku = product.sku
        this.productName = product.productName
        this.variantName = product.variantName
        this.price = product.price
        this.productId = product.productId
        this.productCount = product.productCount
    }
}

export { Product }
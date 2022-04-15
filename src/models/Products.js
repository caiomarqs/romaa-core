class Product {
    constructor(
        sku,
        productName,
        variantName,
        price,
        productId,
        productCount
    ) {
        this.sku = sku
        this.productName = productName
        this.variantName = variantName
        this.price = price
        this.productId = productId
        this.productCount = productCount
    }
}

export { Product }
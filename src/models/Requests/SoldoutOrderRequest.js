class SoldoutOrderRequest{
    constructor(order){
        this.name = order.name;
        this.cpf = order.cpf;
        this.products = this.mapProducts(order.products)
        this.price = Number.parseFloat(order.price)
    }

    mapProducts(products){
        return products.map(product => new SoldoutProductRequest(product))
    }
}

class SoldoutProductRequest {
    constructor(product) {
        this.model = product.model;
        this.size = product.size;
        this.color = product.color;
        this.qntd = Number.parseInt(product.qntd);
        this.price = Number.parseFloat(product.price);
    }
}

export {
    SoldoutOrderRequest
}
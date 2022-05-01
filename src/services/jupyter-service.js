import { OrdersCollection } from "../data"
import { sortByKey } from "../utils"
import {
    OrdersJupyter,
    OrdersWithNoClient
} from "../models/Responses"

const getAllOrders = async () => {
    const orders = await OrdersCollection.getAllOrders()

    const elements = [
        'date',
        'updatedAt',
        'orderNumber',
        'zipCode',
        'city',
        'province',
        'country',
        'cpf',
        'cnpj',
        'fullName',
        'totalCostOfOrder',
        'productsTotal',
        'shippingCost',
        'status',
        'reembolsado',
        'pagoPeloCliente',
        'paymentStatus',
        'paymentMethod',
        'paymentGateway',
        'fulfillmentStatus',
        'shippingGetway',
        'shippingCompany',
        'shippingService',
        'shippingDays',
        'productsCost',
        'products'
    ]

    const models = orders.map(order => (
        new OrdersJupyter(order)
            .translatePaymentMethodsValues()
            .getPrincipalElements(...elements)
    ))

    return sortByKey(models, 'orderNumber', true)
}

const getAllOrdersNoClients = async () => {
    const orders = await OrdersCollection.getAllOrders()
    const models = orders.map(order => new OrdersWithNoClient(order))
    return models
}

const JupyterService = {
    getAllOrders,
    getAllOrdersNoClients
}

export { JupyterService }
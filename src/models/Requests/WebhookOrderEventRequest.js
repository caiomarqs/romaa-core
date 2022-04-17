import { convertDocumentNumberToNumber } from "../../utils"
import { Order } from "../Order"
import { Product } from "../Products"

class WebhookOrderEventRequest {
    constructor(req) {
        this.event = req.event
        this.order = new WebhookOrderRequest(req.order)
    }

    /**
     * 
     * @returns {Order}
     */
    mapToOrder() {
        let order = new Order()

        order.date = this.order.createdAt
        order.updatedAt = this.order.updatedAt
        order.orderNumber = this.order.orderNumber
        order.lineItemNumber = this.order.lineItems?.length
        order.email = this.order.email
        order.contactPerson = `${this.order.customer.firstName} ${this.order.customer.lastName} - ${this.order.customer.cpf || this.order.customer.cnpj}`
        order.address = this.order.address.address1
        order.address2 = this.order.address.compartment
        order.zipCode = this.order.address.zip
        order.city = this.order.address.city
        order.province = this.order.address.province
        order.country = this.order.address.country

        if (this.order.customer.cpf) {
            order.cpf = convertDocumentNumberToNumber(this.order.customer.cpf)
        }

        if (this.order.customer.cnpj) {
            order.cnpj = convertDocumentNumberToNumber(this.order.customer.cnpj)
        }

        order.fullName = `${this.order.customer.firstName} ${this.order.customer.lastName}`
        order.mobileNo = this.order.customer.phone
        order.orderMemo = ""
        order.orderCustomNotes = this.order.customNotes
        order.shippingMethod = this.order.orderShippings.title
        order.totalCostOfOrder = this.order.totalPrice
        order.productsTotal = this.order.subtotalPrice
        order.paymentGateway = this.order.payment_gateway
        order.shippingCost = this.order.orderShippings.price
        order.aliExpressOrderNumber = this.order.lineItems ? this.order.lineItems[0].aliExpressOrderNumber : ""
        order.trackingNo = this.order.orderShippings.code
        order.status = this.getStatus()
        order.reembolsado = 0
        order.pagoPeloCliente = this.order.totalPrice
        order.recebivelCartPandaPayments = this.orderrecebivelCartPandaPayments
        order.authCode = ""
        order.nsu = ""
        order.paymentStatus = this.getPaymentStatus()
        order.paymentMethod = this.order.payment.paymentType
        order.fulfillmentStatus = this.getFulfillmentStatus()
        order.trackingCode = this.order.orderShippings.code
        order.products = this.order.lineItems.map(lineItem => new Product(
            lineItem.sku,
            lineItem.name,
            lineItem.variantTitle,
            lineItem.price,
            lineItem.productId,
            lineItem.quantity
        ))

        return order
    }

    getFulfillmentStatus() {
        if (this.order.fulfillment_status) {
            if (this.order.fulfillment_status.toLocaleLowerCase() !== "unfulfilled") {
                return "Fulfilled"
            }
        }
        else {
            return "Unfulfilled"
        }
    }

    getPaymentStatus() {
        if (this.event.split('.')[1] === "paid") {
            return "Paid"
        }
        if (this.event.split('.')[1] !== "paid" && this.order.status_id === "Cancelled") {
            return "Unpaid"
        }
    }

    getStatus() {
        if(this.getFulfillmentStatus() === "Fulfilled"){
            return "Processado"
        }
        if(this.event.split('.')[1] === "created"){
            return "Aberto"
        }
        if(this.event.split('.')[1] !== "paid" && this.order.status_id === "Cancelled"){
            return "Cancelado"
        }
    }
}

class WebhookOrderRequest {
    constructor(order) {
        this.id = order.id
        this.shopId = order.shop_id
        this.customerId = order.customer_id
        this.userId = order.user_id
        this.locationId = order.location_id
        this.dsersBatchId = order.dsers_batch_id
        this.processedInDsers = order.processed_in_dsers
        this.tinyErpId = order.tiny_erp_id
        this.test = order.test
        this.shippingLines = order.shipping_lines
        this.name = order.name
        this.subtotalPrice = order.subtotal_price
        this.subtotalPriceSet = order.subtotal_price_set
        this.totalDiscounts = order.total_discounts
        this.totalDiscountsSet = order.total_discounts_set
        this.totalLineItemsPrice = order.total_line_items_price
        this.totalLineItemsPriceSet = order.total_line_items_price_set
        this.totalPrice = order.total_price
        this.totalPriceSet = order.total_price_set
        this.totalTax = order.total_tax
        this.totalTaxSet = order.total_tax_set
        this.totalTipReceived = order.total_tip_received
        this.totalWeight = order.total_weight
        this.noOfInstallments = order.no_of_installments
        this.installmentsRate = order.installments_rate
        this.orderStatusUrl = order.order_status_url
        this.email = order.email
        this.legalEntity = order.legal_entity
        this.isArchived = order.is_archived
        this.billingAddressId = order.billing_address_id
        this.shippingAddressId = order.shipping_address_id
        this.browserIp = order.browser_ip
        this.buyerAcceptsMarketing = order.buyer_accepts_marketing
        this.cancelReason = order.cancel_reason
        this.cartToken = order.cart_token
        this.clientDetails = order.client_details
        this.currency = order.currency
        this.customerLocale = order.customer_locale
        this.discountApplications = order.discount_applications
        this.discountCodes = order.discount_codes
        this.landingSite = order.landing_site
        this.note = order.note
        this.noteAttributes = order.note_attributes
        this.customNotes = order.custom_notes
        this.number = order.number
        this.orderNumber = order.order_number
        this.paymentDetails = order.payment_details
        this.paymentGatewayNames = order.payment_gateway_names
        this.phone = order.phone
        this.presentmentCurrency = order.presentment_currency
        this.processingMethod = order.processing_method
        this.referringSite = order.referring_site
        this.sourceName = order.source_name
        this.tags = order.tags
        this.taxLines = order.tax_lines
        this.taxesIncluded = order.taxes_included
        this.token = order.token
        this.cardToken = order.card_token
        this.customerToken = order.customer_token
        this.cvv = order.cvv
        this.isSync = order.is_sync
        this.inProgress = order.in_progress
        this.isWoocommerceSync = order.is_woocommerce_sync
        this.isMagentoSync = order.is_magento_sync
        this.statusId = order.status_id
        this.fulfillmentStatus = order.fulfillment_status
        this.chargebackReceived = order.chargeback_received
        this.processedAt = order.processed_at
        this.cancelledAt = order.cancelled_at
        this.closedAt = order.closed_at
        this.boletoEmailSent = order.boleto_email_sent
        this.cartxpaymentTransactionId = order.cartxpayment_transaction_id
        this.createdAt = order.created_at
        this.updatedAt = order.updated_at
        this.orderComment = order.order_comment
        this.isCartxTest = order.is_cartx_test
        this.paypalOrderId = order.paypal_order_id
        this.tempPaypal = order.temp_paypal
        this.pagseguroCcCPF = order.pagseguro_ccCPF
        this.antifraudSyncedAt = order.antifraud_synced_at
        this.shopifyOrderId = order.shopify_order_id
        this.address = new WebhookOrderAddressRequest(order.address)
        this.lineItems = order.line_items ? order.line_items.map(lineItem => new WebhookOrderLineItemsRequest(lineItem)) : []
        this.customer = new WebhookOrderCustomerRequest(order.customer)
        this.orderShippings = new WebhookOrderShippingsRequest(order.orders_shippings)
        this.shop = new WebhookOrderShopRequest(order.shop)

        if (order.payment_type || !order.payment.payment_type) {
            order.payment.payment_type = order.payment_type
        }

        this.payment = new WebhookOrderPaymentRequest(order.payment)
    }
}

class WebhookOrderAddressRequest {
    constructor(address) {
        this.id = address.id
        this.orderId = address.order_id
        this.address1 = address.address1
        this.address2 = address.address2
        this.address = address.address
        this.houseNo = address.house_no
        this.compartment = address.compartment
        this.neighborhood = address.neighborhood
        this.city = address.city
        this.company = address.company
        this.country = address.country
        this.firstName = address.first_name
        this.lastName = address.last_name
        this.latitude = address.latitude
        this.longitude = address.longitude
        this.phone = address.phone
        this.province = address.province
        this.zip = address.zip
        this.name = address.name
        this.countryCode = address.country_code
        this.provinceCode = address.province_code
        this.type = address.type
        this.createdAt = address.created_at
        this.updatedAt = address.updated_at
    }
}

class WebhookOrderLineItemsRequest {
    constructor(lineItem) {
        this.id = lineItem.id
        this.orderId = lineItem.order_id
        this.productId = lineItem.product_id
        this.variantId = lineItem.variant_id
        this.fulfillableQuantity = lineItem.fulfillable_quantity
        this.fulfillmentWervice = lineItem.fulfillment_service
        this.grams = lineItem.grams
        this.price = lineItem.price
        this.quantity = lineItem.quantity
        this.inventorySync = lineItem.inventory_sync
        this.requiresShipping = lineItem.requires_shipping
        this.sku = lineItem.sku
        this.title = lineItem.title
        this.variantTitle = lineItem.variant_title
        this.vendor = lineItem.vendor
        this.name = lineItem.name
        this.giftCard = lineItem.gift_card
        this.taxable = lineItem.taxable
        this.totalDiscount = lineItem.total_discount
        this.totalDiscountSet = lineItem.total_discount_set
        this.discountAllocations = lineItem.discount_allocations
        this.shippingMethod = lineItem.shipping_method
        this.totalCostOfOrder = lineItem.total_cost_of_order
        this.aliExpressOrderNumber = lineItem.aliexpress_order_number
        this.trackingNo = lineItem.tracking_no
        this.statusId = lineItem.status_id
        this.isOcu = lineItem.is_ocu
        this.pageId = lineItem.page_id
        this.customOptions = lineItem.custom_options
        this.isDigital = lineItem.is_digital
        this.upSellId = lineItem.up_sell_id
        this.upSellType = lineItem.up_sell_type
        this.offerId = lineItem.offer_id
        this.refundedQuantity = lineItem.refunded_quantity
        this.isRefunded = lineItem.is_refunded
        this.createdAt = lineItem.created_at
        this.updatedAt = lineItem.updated_at
        this.appointmentData = lineItem.appointment_data
        this.appType = lineItem.app_type
        this.appTypeId = lineItem.app_type_id
        this.variant = lineItem.variant ? new WebhookOrderVariantRequest(lineItem.variant) : {}
    }
}

class WebhookOrderVariantRequest {
    constructor(variant) {
        this.id = variant.id
        this.productId = variant.product_id
        this.default = variant.default
        this.title = variant.title
        this.price = variant.price
        this.compareAtPrice = variant.compare_at_price
        this.costPerItem = variant.cost_per_item
        this.sku = variant.sku
        this.aliexpressSku = variant.aliexpress_sku
        this.position = variant.position
        this.inventoryPolicy = variant.inventory_policy
        this.quantity = variant.quantity
        this.preventOutOfStockSelling = variant.prevent_out_of_stock_selling
        this.taxable = variant.taxable
        this.barcode = variant.barcode
        this.swatches = variant.swatches
        this.length = variant.length
        this.width = variant.width
        this.height = variant.height
        this.dimensionUnit = variant.dimension_unit
        this.weight = variant.weight
        this.weightUnit = variant.weight_unit
        this.requiresShipping = variant.requires_shipping
        this.hasDigitalAttachment = variant.has_digital_attachment
        this.enabledShopifyRedirect = variant.enabled_shopify_redirect
        this.createdAt = variant.created_at
        this.updatedAt = variant.updated_at
        this.deletedAt = variant.deleted_at
    }
}

class WebhookOrderCustomerRequest {
    constructor(customer) {
        this.id = customer.id
        this.shopId = customer.shop_id
        this.firstName = customer.first_name
        this.lastName = customer.last_name
        this.email = customer.email
        this.phone = customer.phone
        this.cpf = customer.cpf
        this.cnpj = customer.cnpj
        this.stateRegNum = customer.state_reg_num
        this.cpn = customer.cpn
        this.houseNumber = customer.house_number
        this.taxExempt = customer.tax_exempt
        this.emailMarketing = customer.email_marketing
        this.source = customer.source
        this.tags = customer.tags
        this.notes = customer.notes
        this.createdAt = customer.created_at
        this.updatedAt = customer.updated_at
        this.paypalPayerId = customer.paypal_payer_id
        this.sessionKey = customer.session_key
    }
}

class WebhookOrderShippingsRequest {
    constructor(shipping) {
        this.id = shipping.id
        this.orderId = shipping.order_id
        this.shopId = shipping.shop_id
        this.code = shipping.code
        this.price = shipping.price
        this.actualPricePaid = shipping.actual_price_paid
        this.paidByClient = shipping.paid_by_client
        this.discountedPrice = shipping.discounted_price
        this.source = shipping.source
        this.title = shipping.title
        this.deliveryCategory = shipping.delivery_category
        this.carrierIdentifier = shipping.carrier_identifier
        this.requestedFulfillmentServiceId = shipping.requested_fulfillment_service_id
        this.labelUrl = shipping.label_url
        this.createdAt = shipping.created_at
        this.updatedAt = shipping.updated_at
        this.melhorEnvioId = shipping.melhor_envio_id
        this.melhorEnvioService = shipping.melhor_envio_service
        this.shippingGateway = shipping.shipping_gateway
        this.correiosShippingMethodCode = shipping.correios_shipping_method_code
        this.frenetService = shipping.frenet_service
        this.mandaeService = shipping.mandae_service
        this.mandaeOrderId = shipping.mandae_order_id
        this.intelipostService = shipping.intelipost_service
    }
}

class WebhookOrderShopRequest {
    constructor(shop) {
        this.id = shop.id
        this.name = shop.name
        this.slug = shop.slug
        this.phoneExt = shop.phone_ext
        this.phone = shop.phone
        this.country = shop.country
        this.countryCode = shop.country_code
        this.timezone = shop.timezone
        this.website = shop.website
        this.status = shop.status
        this.redirectionEnable = shop.redirection_enable
        this.redirectionUrl = shop.redirection_url
        this.termAndServices = shop.term_and_services
        this.passwordPageMessage = shop.password_page_message
    }
}

class WebhookOrderPaymentRequest {
    constructor(payment) {
        this.id = payment.id
        this.orderId = payment.order_id
        this.statusId = payment.status_id
        this.createdAt = payment.created_at
        this.updatedAt = payment.updated_at
        this.amount = payment.amount
        this.gateway = payment.gateway
        this.boletoCode = payment.boleto_code
        this.boletoLink = payment.boleto_link
        this.boletoLimitDate = payment.boleto_limit_date
        this.pixCode = payment.pix_code
        this.pixQr = payment.pix_qr
        this.pixLimitDate = payment.pix_limit_date
        this.paymentType = payment.payment_type
    }
}

export { WebhookOrderEventRequest }
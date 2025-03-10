import { gql } from 'apollo-server';

export const types = gql`
  extend type Mutation {
    draftOrder(orderInput: DraftOrderInput): Int!
    markOrderAsPending(draftId: String!): Boolean
    archiveOrder(draftId: String, orderId: String): Boolean
    markOrderAsConfirmed(
      draftId: String
      orderId: String
      isPayOnDeliveryOrder: Boolean
    ): Boolean
    markOrderAsCancelled(orderId: String!, reasonForCancel: String): Boolean
    markOrderItemAsCancelled(
      orderId: String!
      orderItemId: String!
      reasonForCancel: String
    ): Boolean
    putOrderAddress(draftId: String!, addressId: String!): Boolean
  }

  extend type Query {
    previewOrder(draftId: String, orderId: String): OrderPreview
    paymentToken(
      draftId: String!
      returnUrl: String
      paymentMethods: String
    ): PaymentOrderDetails
    banks: [Bank]
    apps: [App]
    pageOfOrderItems(
      page: Int!
      pageSize: Int!
      role: Role!
      userId: String
      sellerId: String
      filters: OrderFilter
    ): [OrderItem]
    invoiceForOrderItem(orderId: String!, orderItemId: String!): String
    paymentStatus(draftId: String, orderId: String): PaymentOrderDetails
  }

  input Transaction {
    transactionMethod: String!
    transactionReference: String
  }

  input DraftOrderInput {
    userId: String!
    billingAddressId: String
    shippingAddressId: String
    items: [OrderItemInput]
  }

  input OrderItemInput {
    productId: String!
    productSKUId: String!
    quantity: Int!
  }

  input OrderFilter {
    userIds: [String]
    sellerIds: [String]
    orderItemStatuses: [OrderItemStatus]
    dateRange: DateRangeInput
  }

  enum OrderItemStatus {
    DRAFT
    PENDING
    CONFIRMED
    CANCELLED
    READY_FOR_SHIP
    SHIPPED
    IN_TRANSIT
    DELIVERED
  }

  enum OrderStatus {
    DRAFT
    PENDING
    CONFIRMED
    CANCELLED
    PARTIALLY_CANCELLED
    COMPLETE
  }

  type PaymentOrderDetails {
    orderId: String
    cashFreeOrderId: String
    orderToken: String
    orderStatus: String
  }

  type OrderPreview {
    draftId: String!
    status: OrderStatus!
    orderTotal: Float!
    currency: Currency!
    user: User!
    billingAddress: Address
    shippingAddress: Address
    orderItems: [PreviewItem]
  }

  type PreviewItem {
    id: String!
    productName: String!
    originalPrice: Float!
    sellingPrice: Float!
    totalPrice: Float!
    currency: Currency!
    quantity: Int!
  }

  type OrderItem {
    id: String!
    orderId: String!
    orderDate: String
    quantity: Int!
    productName: String
    seller: SellerReference
    user: User
    sellingPrice: Float
    originalPrice: Float
    totalPrice: Float!
    currencyId: String!
    orderItemStatus: OrderItemStatus
    shipingAddress: Address
    billingAddress: Address
  }

  extend type OrderItem {
    images: [ImageResult]
  }

  type Bank {
    id: String!
    name: String!
  }

  type App {
    id: String!
    name: String!
  }
`;

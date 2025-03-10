import {
  draftOrder,
  getOrderPreview,
  getBanks,
  getPaymentToken,
  getApps,
  markOrderAsPending,
  markOrderAsConfirmed,
  putOrderAddress,
  pageOfOrderItems,
  markOrderAsCancelled,
  markOrderItemAsCancelled,
  getImagesForOrderItem,
  getInvoiceForOrderItem,
  getPaymentStatus,
  archiveOrder
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      previewOrder: getOrderPreview,
      banks: getBanks,
      apps: getApps,
      paymentToken: getPaymentToken,
      paymentStatus: getPaymentStatus,
      pageOfOrderItems: pageOfOrderItems,
      invoiceForOrderItem: getInvoiceForOrderItem
    },
    Mutation: {
      draftOrder: draftOrder,
      markOrderAsPending: markOrderAsPending,
      archiveOrder: archiveOrder,
      markOrderAsConfirmed: markOrderAsConfirmed,
      putOrderAddress: putOrderAddress,
      markOrderAsCancelled: markOrderAsCancelled,
      markOrderItemAsCancelled: markOrderItemAsCancelled
    },
    OrderItem: {
      images: getImagesForOrderItem
    }
  },
  types: types
};

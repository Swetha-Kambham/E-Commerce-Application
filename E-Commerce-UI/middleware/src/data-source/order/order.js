import { BaseDataSource } from '../base';
import banks from './banks';
import apps from './apps';
import {
  clientToServiceOrderItemStatusMap,
  serviceToClientOrderItemStatusMap,
  serviceToClientOrderStatusMap
} from './utils';
import { generatePdfAsync } from '../utils';
import { getDocDefinition } from './invoice-doc-definition';

export class OrderDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
    this.banks = banks;
    this.apps = apps;
  }

  async draftOrder(orderInput) {
    const res = await this.serviceClient.request(
      'OrderService1',
      'DraftOrder',
      {
        order: {
          userId: orderInput.userId,
          billingAddressId: orderInput.billingAddressId,
          shippingAddressId: orderInput.shippingAddressId,
          details: orderInput.items.map((item) => ({
            productId: item.productId,
            productSKUId: item.productSKUId,
            quantity: item.quantity
          }))
        }
      }
    );

    return res && res.id;
  }

  async getOrderPreview(draftId, orderId) {
    const res = await this.serviceClient.request(
      'OrderService1',
      'GetOrderPreview',
      {
        order: {
          draftId: draftId,
          orderId: orderId
        }
      }
    );

    return {
      ...res,
      status: serviceToClientOrderStatusMap[res.status]
    };
  }

  async markOrderAsPending(draftId) {
    try {
      await this.serviceClient.request('OrderService1', 'MarkOrderAsPending', {
        order: {
          draftId: draftId
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async archiveOrder(draftId, orderId) {
    try {
      await this.serviceClient.request('OrderService1', 'ArchiveOrder', {
        order: {
          draftId: draftId,
          orderId: orderId
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async markOrderAsConfirmed(draftId, orderId, isPayOnDeliveryOrder) {
    try {
      await this.serviceClient.request(
        'OrderService1',
        'MarkOrderAsConfirmed',
        {
          order: {
            draftId: draftId,
            orderId: orderId
          },
          isPayOnDeliveryOrder: isPayOnDeliveryOrder
        }
      );
      return true;
    } catch (ex) {
      return null;
    }
  }
  async markOrderAsCancelled(orderId, reasonForCancel) {
    try {
      await this.serviceClient.request(
        'OrderService1',
        'MarkOrderAsCancelled',
        {
          order: {
            orderId: orderId
          },
          reasonForCancel: reasonForCancel
        }
      );
      return true;
    } catch (ex) {
      return null;
    }
  }

  async markOrderItemAsCancelled(orderId, orderItemId, reasonForCancel) {
    try {
      await this.serviceClient.request(
        'OrderService1',
        'MarkOrderItemAsCancelled',
        {
          order: { orderId: orderId },
          orderItem: {
            id: orderItemId
          },
          reasonForCancel: reasonForCancel
        }
      );
      return true;
    } catch (ex) {
      return null;
    }
  }

  async getPaymentToken(draftId, returnUrl, paymentMethods) {
    const res = await this.serviceClient.request(
      'OrderService1',
      'CreatePaymentToken',
      {
        order: {
          draftId: draftId
        },
        parameters: {
          returnUrl: returnUrl,
          paymentMethods: paymentMethods
        }
      }
    );

    return res;
  }

  async getPaymentStatus(draftId, orderId) {
    const res = await this.serviceClient.request(
      'OrderService1',
      'GetPaymentStatus',
      {
        order: {
          draftId: draftId,
          orderId: orderId
        }
      }
    );

    return res;
  }

  async getOrderItemsForUser({ page, pageSize, userId, filters }) {
    const serviceFilters = filters || {};

    if (serviceFilters.orderStatuses && serviceFilters.orderStatuses.length) {
      serviceFilters.orderStatuses = serviceFilters.orderStatuses.map(
        (x) => clientToServiceOrderItemStatusMap[x]
      );
    }
    const res = await this.serviceClient.request(
      'OrderService1',
      'GetOrderItemsForUser',
      {
        page: page,
        pageSize: pageSize,
        user: { id: userId },
        filters: serviceFilters
      }
    );

    return res.map((r) => ({
      ...r,
      orderItemStatus: serviceToClientOrderItemStatusMap[r.orderItemStatus]
    }));
  }

  async getOrderItemsForSeller({ page, pageSize, sellerId, filters }) {
    const serviceFilters = filters || {};

    if (serviceFilters.orderStatuses && serviceFilters.orderStatuses.length) {
      serviceFilters.orderStatuses = serviceFilters.orderStatuses.map(
        (x) => clientToServiceOrderItemStatusMap[x]
      );
    }
    const res = await this.serviceClient.request(
      'OrderService1',
      'GetOrderItemsForSeller',
      {
        page: page,
        pageSize: pageSize,
        seller: { id: sellerId },
        filters: serviceFilters
      }
    );

    return res.map((r) => ({
      ...r,
      orderItemStatus: serviceToClientOrderItemStatusMap[r.orderItemStatus]
    }));
  }

  async getOrderItems({ page, pageSize, filters }) {
    const serviceFilters = filters || {};

    if (serviceFilters.orderStatuses && serviceFilters.orderStatuses.length) {
      serviceFilters.orderStatuses = serviceFilters.orderStatuses.map(
        (x) => clientToServiceOrderItemStatusMap[x]
      );
    }
    const res = await this.serviceClient.request(
      'OrderService1',
      'GetOrderItems',
      {
        page: page,
        pageSize: pageSize,
        filters: serviceFilters
      }
    );

    return res.map((r) => ({
      ...r,
      orderItemStatus: serviceToClientOrderItemStatusMap[r.orderItemStatus]
    }));
  }

  async putOrderAddress(draftId, addressId) {
    try {
      await this.serviceClient.request('OrderService1', 'PutOrderAddress', {
        order: {
          draftId: draftId
        },
        userAddress: {
          id: addressId
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getProductUnitReferenceForOrderItem(orderId, orderItemId) {
    try {
      const res = await this.serviceClient.request(
        'OrderService1',
        'GetProductUnitReferenceForOrderItem',
        {
          order: { orderId: orderId },
          orderItem: {
            id: orderItemId
          }
        }
      );
      return res;
    } catch (ex) {
      return null;
    }
  }

  async getInvoiceForOrderItem(orderId, orderItemId) {
    try {
      const res = await this.serviceClient.request(
        'OrderService1',
        'GetInvoiceDetails',
        {
          order: { orderId: orderId },
          orderItem: {
            id: orderItemId
          }
        }
      );

      const docDefinition = getDocDefinition(res);

      const base64 = await generatePdfAsync(docDefinition);

      return base64;
    } catch (ex) {
      return null;
    }
  }

  getBanks() {
    return this.banks;
  }

  getApps() {
    return this.apps;
  }
}

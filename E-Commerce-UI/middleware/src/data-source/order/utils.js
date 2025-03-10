export const clientToServiceOrderItemStatusMap = {
  DRAFT: 'draft',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  READY_FOR_SHIP: 'ready-for-ship',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in-transit',
  DELIVERED: 'delivered'
};

export const serviceToClientOrderItemStatusMap = {
  draft: 'DRAFT',
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  'ready-for-ship': 'READY_FOR_SHIP',
  shipped: 'SHIPPED',
  'in-transit': 'IN_TRANSIT',
  delivered: 'DELIVERED'
};

export const serviceToClientOrderStatusMap = {
  draft: 'DRAFT',
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  'partially-cancelled': 'PARTIALLY_CANCELLED',
  complete: 'COMPLETE'
};

export const pageOfOrderItems = async (parent, args, context) => {
  const { page, pageSize, userId, sellerId, filters, role } = args;

  if (role === 'USER') {
    const orders = await context.dataSource.order.getOrderItemsForUser({
      page: page,
      pageSize: pageSize,
      userId: userId,
      filters: filters
    });

    return orders;
  }

  if (role === 'SELLER') {
    const orders = await context.dataSource.order.getOrderItemsForSeller({
      page: page,
      pageSize: pageSize,
      sellerId: sellerId,
      filters: filters
    });

    return orders;
  }

  if (role === 'ADMIN') {
    const orders = await context.dataSource.order.getOrderItems({
      page: page,
      pageSize: pageSize,
      filters: filters
    });

    return orders;
  }
};

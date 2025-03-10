import { v4 } from 'uuid';

export const getViewProducts = async (parent, args, context) => {
  const { page, pageSize, viewId, filters } = args;
  const response = await context.dataSource.productView.getViewProducts(
    page,
    pageSize,
    { ...filters, viewIds: [viewId] }
  );

  return response && response.length
    ? response[0].products.map((p) => ({ ...p, id: v4() }))
    : [];
};

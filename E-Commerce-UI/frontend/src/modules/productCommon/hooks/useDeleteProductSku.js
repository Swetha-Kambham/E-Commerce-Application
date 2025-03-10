import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_SKU = gql`
  mutation deleteProductSKU($productId: String!, $skuId: String!) {
    deleteProductSKU(productId: $productId, skuId: $skuId)
  }
`;

export const useDeleteProductSku = () => {
  const [deleteProductSKU] = useMutation(DELETE_PRODUCT_SKU);

  return {
    deleteProductSKU: async ({ productId, skuId }) => {
      const res = await deleteProductSKU({
        variables: { productId, skuId },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};

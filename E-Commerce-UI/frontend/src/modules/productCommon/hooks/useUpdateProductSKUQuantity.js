import { useMutation, gql } from '@apollo/client';

const UPDATE_PRODUCT_SKU_QUANTITY = gql`
  mutation updateProductSKUQuantity(
    $productId: String!
    $skuId: String!
    $quantity: Int
  ) {
    updateProductSKUQuantity(
      productId: $productId
      skuId: $skuId
      quantity: $quantity
    )
  }
`;

export const useUpdateProductSKUQuantity = () => {
  const [updateProductSKUQuantity] = useMutation(UPDATE_PRODUCT_SKU_QUANTITY);

  return {
    updateProductSKUQuantity: async ({
      productId,
      skuId,
      quantity,
      refetchProduct
    }) => {
      const res = await updateProductSKUQuantity({
        variables: {
          productId,
          skuId,
          quantity: parseInt(quantity)
        },
        refetchQueries: (() => {
          return refetchProduct ? ['product'] : [];
        })()
      });

      return res;
    }
  };
};

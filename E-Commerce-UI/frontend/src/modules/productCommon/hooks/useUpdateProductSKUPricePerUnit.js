import { useMutation, gql } from '@apollo/client';

const UPDATE_PRODUCT_SKU_PRICE_PER_UNIT = gql`
  mutation updateProductSKUPricePerUnit(
    $productId: String!
    $skuId: String!
    $pricePerUnit: Money!
  ) {
    updateProductSKUPricePerUnit(
      productId: $productId
      skuId: $skuId
      pricePerUnit: $pricePerUnit
    )
  }
`;

export const useUpdateProductSKUPricePerUnit = () => {
  const [updateProductSKUPricePerUnit] = useMutation(
    UPDATE_PRODUCT_SKU_PRICE_PER_UNIT
  );

  return {
    updateProductSKUPricePerUnit: async ({
      productId,
      skuId,
      pricePerUnit,
      currencySymbol,
      refetchProduct
    }) => {
      const res = await updateProductSKUPricePerUnit({
        variables: {
          productId,
          skuId,
          pricePerUnit: { amount: parseFloat(pricePerUnit), currencySymbol }
        },
        refetchQueries: (() => {
          return refetchProduct ? ['product'] : [];
        })()
      });

      return res;
    }
  };
};

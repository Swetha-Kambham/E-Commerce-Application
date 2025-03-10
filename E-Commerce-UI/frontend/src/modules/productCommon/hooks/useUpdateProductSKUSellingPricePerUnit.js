import { useMutation, gql } from '@apollo/client';

const UPDATE_PRODUCT_SKU_SELLING_PRICE_PER_UNIT = gql`
  mutation updateProductSKUSellingPricePerUnit(
    $productId: String!
    $skuId: String!
    $sellingPricePerUnit: Float!
  ) {
    updateProductSKUSellingPricePerUnit(
      productId: $productId
      skuId: $skuId
      sellingPricePerUnit: $sellingPricePerUnit
    )
  }
`;

export const useUpdateProductSKUSellingPricePerUnit = () => {
  const [updateProductSKUSellingPricePerUnit] = useMutation(
    UPDATE_PRODUCT_SKU_SELLING_PRICE_PER_UNIT
  );

  return {
    updateProductSKUSellingPricePerUnit: async ({
      productId,
      skuId,
      sellingPricePerUnit,
      refetchProduct
    }) => {
      const res = await updateProductSKUSellingPricePerUnit({
        variables: {
          productId,
          skuId,
          sellingPricePerUnit: parseFloat(sellingPricePerUnit)
        },
        refetchQueries: (() => {
          return refetchProduct ? ['product'] : [];
        })()
      });

      return res;
    }
  };
};

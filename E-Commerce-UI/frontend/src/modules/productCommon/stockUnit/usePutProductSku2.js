import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT_SKUS = gql`
  mutation putProductSKU(
    $productId: String!
    $skuId: String
    $skuInput: ProductSKUInput!
  ) {
    putProductSKU(productId: $productId, skuId: $skuId, skuInput: $skuInput) {
      id
      productId
      sku
    }
  }
`;

const mapToSkuInput = (skuDetails) => ({
  code: skuDetails.code,
  quantity: parseInt(skuDetails.quantity),
  currencyId: skuDetails.currency?.id,
  pricePerUnit: parseFloat(skuDetails.pricePerUnit),
  sellingPricePerUnit: parseFloat(skuDetails.sellingPricePerUnit),
  optionAndValues: skuDetails.specifications
    .filter((v) => v.optionId && v.valueId)
    .map((v) => ({
      optionId: v.optionId,
      valueId: v.valueId
    }))
});

export const usePutProductSku2 = () => {
  const [putProductSku] = useMutation(PUT_PRODUCT_SKUS);

  return {
    putProductSku: async ({ productId, skuId, skuDetails }) => {
      const res = await putProductSku({
        variables: { productId, skuId, skuInput: mapToSkuInput(skuDetails) },
        refetchQueries: []
      });

      return res?.data?.putProductSKU;
    }
  };
};

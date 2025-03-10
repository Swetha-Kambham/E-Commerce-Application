import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT_SKUS = gql`
  mutation putProductSKUs($productId: String!, $skus: [ProductSKU]) {
    putProductSKUs(productId: $productId, skus: $skus)
  }
`;

const mapToSkusInput = (skus = []) =>
  skus.map((sku) => ({
    quantity: parseInt(sku.quantity),
    currencySymbol: sku.currencySymbol,
    pricePerUnit: parseFloat(sku.pricePerUnit),
    sellingPricePerUnit: parseFloat(sku.sellingPricePerUnit),
    variant: sku.variant
      .filter((v) => v.optionId && v.valueId)
      .map((v) => ({
        optionId: v.optionId,
        valueId: v.valueId
      }))
  }));

export const usePutProductSkus = () => {
  const [putProductSkus] = useMutation(PUT_PRODUCT_SKUS);

  return {
    putProductSkus: async ({ productId, skus }) => {
      const res = await putProductSkus({
        variables: { productId, skus: mapToSkusInput(skus) },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};

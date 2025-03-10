import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT_PREFERENCE = gql`
  mutation putProductPreference(
    $userId: String!
    $productId: String!
    $skuId: String!
    $quantity: Int
    $type: PreferenceType!
  ) {
    putProductPreference(
      userId: $userId
      productId: $productId
      skuId: $skuId
      quantity: $quantity
      type: $type
    )
  }
`;

export const useAddToCart = () => {
  const [addToCart] = useMutation(PUT_PRODUCT_PREFERENCE);

  return {
    addToCart: async ({ userId, productId, skuId, quantity, type }) => {
      const { data } = await addToCart({
        variables: { userId, productId, skuId, quantity, type },
        refetchQueries: ['getPageOfPreferencesForUser']
      });

      return data?.putProductPreference;
    }
  };
};

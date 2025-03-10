import { useMutation, gql } from '@apollo/client';

const UPDATE_PRODUCT_STATUS = gql`
  mutation updateProductStatus(
    $productId: String!
    $status: String!
    $remark: String
  ) {
    updateProductStatus(productId: $productId, status: $status, remark: $remark)
  }
`;

export const useUpdateProductStatus = () => {
  const [updateProductStatus] = useMutation(UPDATE_PRODUCT_STATUS);

  return {
    updateProductStatus: async ({ productId, status, remark }) => {
      const res = await updateProductStatus({
        variables: { productId, status, remark },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};

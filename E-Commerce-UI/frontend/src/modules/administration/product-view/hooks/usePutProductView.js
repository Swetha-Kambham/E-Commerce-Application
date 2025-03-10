import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT_VIEW = gql`
  mutation putProductView($productView: ProductViewInput) {
    putProductView(productView: $productView) {
      id
      name
    }
  }
`;

export const usePutProductView = () => {
  const [putProductView] = useMutation(PUT_PRODUCT_VIEW);

  return {
    putProductView: async ({ productView }) => {
      const { data } = await putProductView({
        variables: { productView },
        refetchQueries: ['getPageOfProductView']
      });

      return data;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT = gql`
  mutation putProduct($input: PutProductInput) {
    putProduct(input: $input) {
      id
      name
    }
  }
`;

export const usePutProduct = () => {
  const [putProduct] = useMutation(PUT_PRODUCT);

  return {
    putProduct: async ({ id, input }) => {
      const res = await putProduct({
        variables: { id, input }
      });

      return res;
    }
  };
};

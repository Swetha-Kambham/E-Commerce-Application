import { useMutation, gql } from '@apollo/client';

const PUT_USER = gql`
  mutation putSeller($id: String, $input: SellerInput) {
    putSeller(id: $id, input: $input)
  }
`;

export const usePutSeller = () => {
  const [putSeller] = useMutation(PUT_USER);

  return {
    putSeller: async ({ id, input }) => {
      const { data } = await putSeller({
        variables: { id, input }
      });

      return data && data.putSeller;
    }
  };
};

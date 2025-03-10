import { useMutation, gql } from '@apollo/client';

const PUT_ORDER_ADDRESS = gql`
  mutation putOrderAddress($draftId: String!, $addressId: String!) {
    putOrderAddress(draftId: $draftId, addressId: $addressId)
  }
`;

export const usePutOrderAddress = () => {
  const [putOrderAddress] = useMutation(PUT_ORDER_ADDRESS);

  return {
    putOrderAddress: async ({ draftId, addressId }) => {
      const { data } = await putOrderAddress({
        variables: {
          draftId,
          addressId
        },
        refetchQueries: ['previewOrder']
      });

      return data?.putOrderAddress;
    }
  };
};

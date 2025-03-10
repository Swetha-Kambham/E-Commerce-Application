import { useMutation, gql } from '@apollo/client';

const DELETE_ADDRESS = gql`
  mutation deleteAddress($userId: String!, $addressId: String!) {
    deleteAddress(userId: $userId, addressId: $addressId)
  }
`;

export const useDeleteAddress = () => {
  const [deleteAddress] = useMutation(DELETE_ADDRESS);

  return {
    deleteAddress: async ({ userId, addressId }) => {
      const { data } = await deleteAddress({
        variables: { userId, addressId },
        refetchQueries: ['userAddresses']
      });
      return data?.deleteAddress;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const PUT_ADDRESS = gql`
  mutation putAddress(
    $userId: String!
    $addressId: String
    $address: AddressInput!
  ) {
    putAddress(userId: $userId, addressId: $addressId, address: $address)
  }
`;

export const usePutAddress = () => {
  const [putAddress] = useMutation(PUT_ADDRESS);

  return {
    putAddress: async ({ userId, addressId, address }) => {
      const { data } = await putAddress({
        variables: { userId, addressId, address },
        refetchQueries: ['userAddresses']
      });

      return data?.putAddress;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const UPDATE_SELLER_ADDRESS = gql`
  mutation updateSellerAddress($sellerId: String!, $address: AddressInput) {
    updateSellerAddress(sellerId: $sellerId, address: $address)
  }
`;

export const useUpdateSellerAddress = () => {
  const [updateSellerAddress] = useMutation(UPDATE_SELLER_ADDRESS);

  return {
    updateSellerAddress: async ({ sellerId, address }) => {
      const res = await updateSellerAddress({
        variables: { sellerId, address },
        refetchQueries: ['sellerDetails']
      });

      return res;
    }
  };
};

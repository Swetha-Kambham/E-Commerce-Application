import { useMutation, gql } from '@apollo/client';

const UPDATE_SELLER_PASSWORD = gql`
  mutation updateSellerPassword($sellerId: String!, $newPassword: String!) {
    updateSellerPassword(sellerId: $sellerId, newPassword: $newPassword)
  }
`;

export const useUpdateSellerPassword = () => {
  const [updateSellerPassword] = useMutation(UPDATE_SELLER_PASSWORD);

  return {
    updateSellerPassword: async ({ sellerId, newPassword }) => {
      const { data } = await updateSellerPassword({
        variables: { sellerId, newPassword }
      });

      return data && data.updateSellerPassword;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($userId: String!, $newPassword: String!) {
    updateUserPassword(userId: $userId, newPassword: $newPassword)
  }
`;

export const useUpdateUserPassword = () => {
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD);

  return {
    updateUserPassword: async ({ userId, newPassword }) => {
      const { data } = await updateUserPassword({
        variables: { userId, newPassword }
      });

      return data && data.updateUserPassword;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const PUT_USER = gql`
  mutation putUser($id: String, $input: UserInput) {
    putUser(id: $id, input: $input)
  }
`;

export const usePutUser = () => {
  const [putUser] = useMutation(PUT_USER);

  return {
    putUser: async ({ id, input }) => {
      const { data } = await putUser({
        variables: { id, input }
      });

      return data && data.putUser;
    }
  };
};

import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      id
      status
      jwt
      role
      loginName
    }
  }
`;

export const useLogin = () => {
  const [login] = useMutation(LOGIN);

  return {
    login: async ({ loginName, password, phoneNumber, emailAddress, role }) => {
      const { data } = await login({
        variables: {
          input: {
            loginName,
            emailAddress,
            phoneNumber,
            password,
            role
          }
        },
        refetchQueries: ['me']
      });

      return data?.login;
    }
  };
};

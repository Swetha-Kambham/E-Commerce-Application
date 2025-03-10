import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT_OPTION_AND_VALUES = gql`
  mutation putProductOptionAndValues($input: PutProductOptionAndValuesInput) {
    putProductOptionAndValues(input: $input)
  }
`;

export const usePutProductOptionAndValues = () => {
  const [putProductOptionAndValues] = useMutation(
    PUT_PRODUCT_OPTION_AND_VALUES
  );

  return {
    putProductOptionAndValues: async ({ input }) => {
      const res = await putProductOptionAndValues({
        variables: { input },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};

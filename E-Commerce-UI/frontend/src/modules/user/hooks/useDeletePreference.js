import { useMutation, gql } from '@apollo/client';

const DELETE_PREFERENCE = gql`
  mutation deletePreference($preferenceId: String!) {
    deletePreference(preferenceId: $preferenceId)
  }
`;

export const useDeletePreference = () => {
  const [deletePreference] = useMutation(DELETE_PREFERENCE);

  return {
    deletePreference: async ({ preferenceId }) => {
      const { data } = await deletePreference({
        variables: { preferenceId },
        refetchQueries: ['getPageOfPreferencesForUser']
      });

      return data;
    }
  };
};

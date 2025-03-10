import { useMutation, gql } from '@apollo/client';

const UPDATE_PREFERENCE_QUANTITY = gql`
  mutation updatePreferenceQuantity($preferenceId: String!, $quantity: Int) {
    updatePreferenceQuantity(preferenceId: $preferenceId, quantity: $quantity)
  }
`;

export const useUpdatePreferenceQuantity = () => {
  const [updatePreferenceQuantity] = useMutation(UPDATE_PREFERENCE_QUANTITY);

  return {
    updatePreferenceQuantity: async ({ preferenceId, quantity }) => {
      const { data } = await updatePreferenceQuantity({
        variables: { preferenceId, quantity: parseInt(quantity) },
        refetchQueries: ['getPageOfPreferencesForUser']
      });

      return data;
    }
  };
};

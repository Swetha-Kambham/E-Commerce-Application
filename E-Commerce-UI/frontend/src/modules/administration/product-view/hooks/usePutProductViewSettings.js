import { useMutation, gql } from '@apollo/client';

const PUT_VIEW_SETTINGS = gql`
  mutation putViewSettings(
    $id: String
    $name: String
    $input: PutViewSettingsInput!
  ) {
    putViewSettings(id: $id, name: $name, input: $input)
  }
`;

export const usePutProductViewSettings = () => {
  const [putViewSettings] = useMutation(PUT_VIEW_SETTINGS);

  return {
    putViewSettings: async ({ id, name, settings }) => {
      const { data } = await putViewSettings({
        variables: { id, input: { name, settings } },
        refetchQueries: ['viewSettings']
      });

      return data;
    }
  };
};
